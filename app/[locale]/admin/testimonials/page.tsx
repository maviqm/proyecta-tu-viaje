import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";

import { createClient } from "@/lib/supabase/server";

type AdminTestimonialsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

type TestimonialRow = {
  id: number;
  name: string;
  country_es: string;
  country_en: string;
  tour_es: string;
  tour_en: string;
  rating: number | string;
  featured: boolean;
  active: boolean;
  display_order: number;
};

export default async function AdminTestimonialsPage({
  params,
}: AdminTestimonialsPageProps) {
  const { locale } = await params;

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(`/${locale}/admin/login`);
  }

  const { data, error } = await supabase
    .from("testimonials")
    .select(`
      id,
      name,
      country_es,
      country_en,
      tour_es,
      tour_en,
      rating,
      featured,
      active,
      display_order
    `)
    .order("display_order", { ascending: true })
    .order("id", { ascending: true });

  if (error) {
    console.error("ADMIN TESTIMONIALS ERROR:", error);
  }

  const testimonials = (data ?? []) as TestimonialRow[];

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold uppercase tracking-widest text-green-700">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Testimonials
            </h1>

            <p className="mt-2 text-gray-600">
              Manage the testimonials displayed on the website.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/admin"
              className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-center font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              Back to Admin
            </Link>

            <Link
              href="/admin/testimonials/new"
              className="rounded-xl bg-green-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-green-800"
            >
              Add Testimonial
            </Link>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 font-medium text-red-700"
          >
            Testimonials could not be loaded.
          </div>
        )}

        {testimonials.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              No testimonials yet
            </h2>

            <p className="mt-3 text-gray-600">
              Add the first testimonial to display it on the website.
            </p>

            <Link
              href="/admin/testimonials/new"
              className="mt-6 inline-block rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Add Testimonial
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Order
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Traveler
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Tour
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Rating
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Featured
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                  {testimonials.map((testimonial) => (
                    <tr key={testimonial.id}>
                      <td className="whitespace-nowrap px-6 py-5 text-sm text-gray-600">
                        {testimonial.display_order}
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-semibold text-gray-900">
                          {testimonial.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {testimonial.country_en}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-medium text-gray-900">
                          {testimonial.tour_en}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-yellow-600">
                        ★ {Number(testimonial.rating).toFixed(1)}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            testimonial.featured
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {testimonial.featured ? "Yes" : "No"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            testimonial.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {testimonial.active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-right">
                        <Link
                          href={`/admin/testimonials/${testimonial.id}/edit`}
                          className="font-semibold text-green-700 hover:text-green-900"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}