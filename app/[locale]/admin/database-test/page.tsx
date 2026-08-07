import { createClient } from "@/lib/supabase/server";

export default async function DatabaseTestPage() {
  const supabase = await createClient();

  const { data: tours, error } = await supabase
    .from("tours")
    .select("id, title, slug, price_adult, active")
    .order("id");

  if (error) {
    return (
      <main className="min-h-screen bg-red-50 px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-red-700">
            Database connection error
          </h1>

          <pre className="mt-6 overflow-x-auto whitespace-pre-wrap rounded-xl bg-gray-100 p-4 text-sm text-gray-800">
            {error.message}
          </pre>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900">
          Supabase Connection Test
        </h1>

        <p className="mt-3 text-gray-600">
          Tours read directly from the database.
        </p>

        <div className="mt-8 space-y-4">
          {tours?.map((tour) => (
            <article
              key={tour.id}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-gray-900">
                {tour.title}
              </h2>

              <p className="mt-2 text-gray-600">
                Slug: {tour.slug}
              </p>

              <p className="mt-1 text-gray-600">
                Adult price: ${tour.price_adult}
              </p>

              <p className="mt-1 text-gray-600">
                Active: {tour.active ? "Yes" : "No"}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}