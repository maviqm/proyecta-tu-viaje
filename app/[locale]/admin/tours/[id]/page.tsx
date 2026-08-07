import { notFound, redirect } from "next/navigation";

import { Link } from "@/i18n/navigation";
import { createClient } from "@/lib/supabase/server";

import TourForm from "../components/TourForm";
import { updateTour } from "./actions";

type EditTourPageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditTourPage({
  params,
  searchParams,
}: EditTourPageProps) {
  const {
    locale,
    id: idParam,
  } = await params;

  const query = await searchParams;

  const id = Number(idParam);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const supabase = await createClient();

  // --------------------------------------------------
  // AUTH
  // --------------------------------------------------

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(`/${locale}/admin/login`);
  }

  // --------------------------------------------------
  // GET TOUR
  // --------------------------------------------------

  const { data: tour, error } = await supabase
    .from("tours")
    .select(`
      id,

      title,
      title_es,
      title_en,

      slug,

      category,
      category_es,
      category_en,

      location,
      location_es,
      location_en,

      duration,
      duration_es,
      duration_en,

      difficulty,
      difficulty_es,
      difficulty_en,

      price_adult,
      price_child,

      featured,
      active,

      image,

      short_description,
      short_description_es,
      short_description_en,

      description,
      description_es,
      description_en,

      includes,
      includes_es,
      includes_en,

      what_to_bring,
      what_to_bring_es,
      what_to_bring_en
    `)
    .eq("id", id)
    .single();

  if (error || !tour) {
    console.error("GET TOUR FOR EDIT ERROR:", error);
    notFound();
  }

  // --------------------------------------------------
  // ERROR MESSAGES
  // --------------------------------------------------

  const errorMessages: Record<string, string> = {
    "missing-required-fields":
      "Please complete all required fields.",

    "invalid-price":
      "The adult and child prices must be valid positive numbers.",

    "duplicate-slug":
      "Another tour already uses this slug.",

    "invalid-image-path":
      "Enter a valid image path such as /images/tours/example.jpg.",

    "database-error":
      "The tour could not be updated. Check the terminal.",
  };

  const errorMessage = query.error
    ? errorMessages[query.error]
    : null;

  // --------------------------------------------------
  // UPDATE ACTION
  // --------------------------------------------------

  const updateTourWithId = updateTour.bind(
    null,
    id
  );

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold uppercase tracking-widest text-green-700">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Edit Tour
            </h1>

            <p className="mt-2 text-gray-600">
              Update the information for{" "}
              {locale === "es"
                ? tour.title_es ??
                  tour.title ??
                  tour.title_en
                : tour.title_en ??
                  tour.title ??
                  tour.title_es}
              .
            </p>
          </div>

          <Link
            href="/admin"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-center font-semibold text-gray-800 transition hover:bg-gray-50"
          >
            Back to Admin
          </Link>
        </div>

        {/* ERROR */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 font-medium text-red-700"
          >
            {errorMessage}
          </div>
        )}

        {/* FORM */}
        <TourForm
          action={updateTourWithId}
          submitLabel="Update Tour"
          initialData={{
            // Title
            title: tour.title,
            titleEs: tour.title_es,
            titleEn: tour.title_en,

            // Slug
            slug: tour.slug,

            // Category
            category: tour.category,
            categoryEs: tour.category_es,
            categoryEn: tour.category_en,

            // Location
            location: tour.location,
            locationEs: tour.location_es,
            locationEn: tour.location_en,

            // Duration
            duration: tour.duration,
            durationEs: tour.duration_es,
            durationEn: tour.duration_en,

            // Difficulty
            difficulty: tour.difficulty,
            difficultyEs: tour.difficulty_es,
            difficultyEn: tour.difficulty_en,

            // Prices
            priceAdult: tour.price_adult,
            priceChild: tour.price_child,

            // Status
            featured: tour.featured,
            active: tour.active,

            // Image
            image: tour.image,

            // Short description
            shortDescription:
              tour.short_description,

            shortDescriptionEs:
              tour.short_description_es,

            shortDescriptionEn:
              tour.short_description_en,

            // Full description
            description: tour.description,

            descriptionEs:
              tour.description_es,

            descriptionEn:
              tour.description_en,

            // Includes
            includes:
              tour.includes ?? [],

            includesEs:
              tour.includes_es ?? [],

            includesEn:
              tour.includes_en ?? [],

            // What to bring
            whatToBring:
              tour.what_to_bring ?? [],

            whatToBringEs:
              tour.what_to_bring_es ?? [],

            whatToBringEn:
              tour.what_to_bring_en ?? [],
          }}
        />
      </div>
    </main>
  );
}