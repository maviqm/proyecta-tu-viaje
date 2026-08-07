import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "./actions";
import { deleteTour } from "./tours/actions";
import DeleteTourButton from "./tours/components/DeleteTourButton";

type AdminPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

export default async function AdminPage({
  searchParams,
}: AdminPageProps) {
  const supabase = await createClient();
    const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/en/admin/login");
  }
  const query = await searchParams;

const successMessages: Record<string, string> = {
  "tour-created": "The tour was created successfully.",
  "tour-updated": "The tour was updated successfully.",
  "tour-deleted": "The tour was deleted successfully.",
};

const errorMessages: Record<string, string> = {
  "invalid-tour-id": "The selected tour is not valid.",
  "delete-failed":
    "The tour could not be deleted. Check the terminal for more information.",
};

const successMessage = query.success
  ? successMessages[query.success]
  : null;

const errorMessage = query.error
  ? errorMessages[query.error]
  : null;
 {
  const { data: tours, error } = await supabase
    .from("tours")
    .select(
      `
        id,
        title,
        slug,
        location,
        duration,
        price_adult,
        price_child,
        featured,
        active
      `
    )
    .order("id", { ascending: true });

  if (error) {
    return (
      <main className="min-h-screen bg-red-50 px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-red-700">
            Unable to load tours
          </h1>

          <p className="mt-4 text-gray-700">
            The administration panel could not read the tours from Supabase.
          </p>

          <pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-xl bg-gray-100 p-4 text-sm text-gray-800">
            {error.message}
          </pre>
        </div>
      </main>
    );
  }

  const totalTours = tours?.length ?? 0;

  const featuredTours =
    tours?.filter((tour) => tour.featured).length ?? 0;

  const activeTours =
    tours?.filter((tour) => tour.active).length ?? 0;

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold uppercase tracking-widest text-green-700">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Tour Management
            </h1>

            <p className="mt-3 text-gray-600">
              Tours loaded directly from the Supabase database.
            </p>
          </div>

        <div className="flex flex-col gap-3 sm:flex-row">
        <Link
            href="/"
            className="inline-flex justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-50"
        >
            View Website
        </Link>

        <form action={logout}>
            <button
            type="submit"
            className="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
            Sign Out
            </button>
        </form>
        </div>
        </div>
        {successMessage && (
        <div
            role="status"
            className="mt-8 rounded-xl border border-green-200 bg-green-50 px-5 py-4 font-medium text-green-800"
        >
            {successMessage}
        </div>
        )}

        {errorMessage && (
        <div
            role="alert"
            className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 font-medium text-red-700"
        >
            {errorMessage}
        </div>
        )}
        <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Total tours
            </p>

            <p className="mt-3 text-4xl font-bold text-gray-900">
              {totalTours}
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Active tours
            </p>

            <p className="mt-3 text-4xl font-bold text-green-700">
              {activeTours}
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Featured tours
            </p>

            <p className="mt-3 text-4xl font-bold text-green-700">
              {featuredTours}
            </p>
          </article>

          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Database
            </p>

            <p className="mt-3 text-xl font-bold text-gray-900">
              Supabase
            </p>
          </article>
        </section>

        <section className="mt-10 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-200 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Tours
              </h2>

              <p className="mt-1 text-gray-600">
                Experiences currently stored in the database.
              </p>
            </div>

           <Link
            href="/admin/tours/new"
            className="rounded-xl bg-green-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-green-800"
            >
            Add New Tour
            </Link>
          </div>

          {totalTours === 0 ? (
            <div className="p-10 text-center">
              <h3 className="text-xl font-bold text-gray-900">
                No tours found
              </h3>

              <p className="mt-3 text-gray-600">
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead className="bg-gray-50 text-sm uppercase tracking-wide text-gray-600">
                  <tr>
                    <th className="px-6 py-4">Tour</th>
                    <th className="px-6 py-4">Duration</th>
                    <th className="px-6 py-4">Adult price</th>
                    <th className="px-6 py-4">Child price</th>
                    <th className="px-6 py-4">Featured</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {tours?.map((tour) => (
                    <tr key={tour.id}>
                      <td className="px-6 py-5">
                        <p className="font-bold text-gray-900">
                          {tour.title}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {tour.location}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {tour.slug}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-gray-700">
                        {tour.duration}
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-900">
                        ${Number(tour.price_adult).toFixed(2)}
                      </td>

                      <td className="px-6 py-5 font-semibold text-gray-900">
                        ${Number(tour.price_child).toFixed(2)}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={
                            tour.featured
                              ? "rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800"
                              : "rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600"
                          }
                        >
                          {tour.featured ? "Yes" : "No"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={
                            tour.active
                              ? "rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800"
                              : "rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-800"
                          }
                        >
                          {tour.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                            <Link
                            href={`/admin/tours/${tour.id}`}
                            className="font-semibold text-green-700 transition hover:text-green-900"
                            >
                            Edit
                            </Link>
                            <DeleteTourButton
                            id={tour.id}
                            title={tour.title}
                            action={deleteTour}
                            />
                        </div>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
}