import { notFound, redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";

import { createClient } from "@/lib/supabase/server";

import TestimonialForm from "../../components/TestimonialForm";
import {
  deleteTestimonial,
  updateTestimonial,
} from "./actions";

type EditTestimonialPageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
};

type TestimonialRow = {
  id: number;
  name: string;
  country_es: string;
  country_en: string;
  tour_es: string;
  tour_en: string;
  tour_slug: string | null;
  comment_es: string;
  comment_en: string;
  rating: number | string;
  featured: boolean;
  active: boolean;
  display_order: number;
};

export default async function EditTestimonialPage({
  params,
  searchParams,
}: EditTestimonialPageProps) {
  const { locale, id: idParam } = await params;
  const query = await searchParams;

  const id = Number(idParam);

  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

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
      tour_slug,
      comment_es,
      comment_en,
      rating,
      featured,
      active,
      display_order
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    notFound();
  }

  const testimonial = data as TestimonialRow;

  const errorMessages: Record<string, string> = {
    "missing-required-fields":
      "Please complete all required fields.",
    "invalid-rating":
      "The rating must be between 1 and 5.",
    "invalid-display-order":
      "The display order must be a whole number equal to or greater than zero.",
    "database-error":
      "The testimonial could not be updated. Check the terminal for more information.",
      "delete-error":
    "The testimonial could not be deleted. Check the terminal for more information.",
  };

  const errorMessage = query.error
    ? errorMessages[query.error]
    : null;
    const updateTestimonialWithId = updateTestimonial.bind(
    null,
    id,
    locale
    );

    const deleteTestimonialWithId = deleteTestimonial.bind(
    null,
    id,
    locale
    );

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold uppercase tracking-widest text-green-700">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Edit Testimonial
            </h1>

            <p className="mt-2 text-gray-600">
              Update the testimonial from {testimonial.name}.
            </p>
          </div>

          <Link
            href="/admin/testimonials"
            className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-center font-semibold text-gray-800 transition hover:bg-gray-50"
          >
            Back to Testimonials
          </Link>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 font-medium text-red-700"
          >
            {errorMessage}
          </div>
        )}

        <TestimonialForm
          action={updateTestimonialWithId}
          submitLabel="Update Testimonial"
          initialData={{
            name: testimonial.name,
            countryEs: testimonial.country_es,
            countryEn: testimonial.country_en,
            tourEs: testimonial.tour_es,
            tourEn: testimonial.tour_en,
            tourSlug: testimonial.tour_slug ?? "",
            commentEs: testimonial.comment_es,
            commentEn: testimonial.comment_en,
            rating: Number(testimonial.rating),
            featured: testimonial.featured,
            active: testimonial.active,
            displayOrder: testimonial.display_order,
          }}
        />
        <div className="mt-8 rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold text-red-700">
    Delete testimonial
  </h2>

  <p className="mt-2 text-gray-600">
    This action permanently deletes the testimonial and cannot be undone.
  </p>

  <form
    action={deleteTestimonialWithId}
    className="mt-5"
  >
    <button
      type="submit"
      className="rounded-xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800"
    >
      Delete Testimonial
    </button>
  </form>
</div>
      </div>
    </main>
  );
}