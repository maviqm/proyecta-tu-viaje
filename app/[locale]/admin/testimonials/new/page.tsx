import { redirect } from "next/navigation";
import { Link } from "@/i18n/navigation";

import { createClient } from "@/lib/supabase/server";

import TestimonialForm from "../components/TestimonialForm";
import { createTestimonial } from "./actions";

type NewTestimonialPageProps = {
  params: Promise<{
    locale: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewTestimonialPage({
  params,
  searchParams,
}: NewTestimonialPageProps) {
  const { locale } = await params;
  const query = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(`/${locale}/admin/login`);
  }

  const errorMessages: Record<string, string> = {
    "missing-required-fields":
      "Please complete all required fields.",
    "invalid-rating":
      "The rating must be between 1 and 5.",
    "invalid-display-order":
      "The display order must be a whole number equal to or greater than zero.",
    "database-error":
      "The testimonial could not be saved. Check the terminal for more information.",
  };

  const errorMessage = query.error
    ? errorMessages[query.error]
    : null;

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold uppercase tracking-widest text-green-700">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              Add Testimonial
            </h1>

            <p className="mt-2 text-gray-600">
              Add a bilingual testimonial to the website.
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

        <TestimonialForm action={createTestimonial} />
      </div>
    </main>
  );
}