import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import TourForm from "../components/TourForm";
import { createTour } from "./actions";

type NewTourPageProps = {
  params: Promise<{
    locale: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function NewTourPage({
  params,
  searchParams,
}: NewTourPageProps) {
  const { locale } = await params;
  const query = await searchParams;

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
  // ERROR MESSAGES
  // --------------------------------------------------

  const errorMessages: Record<string, string> = {
    "missing-required-fields":
      "Please complete all required fields.",

    "invalid-price":
      "The adult and child prices must be valid positive numbers.",

    "duplicate-slug":
      "Another tour already uses this slug. Please enter a different slug.",

    "database-error":
      "The tour could not be saved. Check the terminal for more information.",

    "duplicate-id":
      "The database ID sequence is out of sync. Please reset the tours ID sequence.",

    "invalid-image-path":
      "Enter a valid image path such as /images/tours/example.jpg.",
  };

  const errorMessage = query.error
    ? errorMessages[query.error]
    : null;

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-gray-100 p-6 sm:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-semibold uppercase tracking-widest text-green-700">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Add New Tour
          </h1>

          <p className="mt-2 text-gray-600">
            Complete the information below to publish a new experience.
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 font-medium text-red-700"
          >
            {errorMessage}
          </div>
        )}

        <TourForm
          action={createTour}
          submitLabel="Create Tour"
        />
      </div>
    </main>
  );
}