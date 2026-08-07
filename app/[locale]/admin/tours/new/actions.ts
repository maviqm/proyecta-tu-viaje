"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function textToArray(
  value: FormDataEntryValue | null
): string[] {
  return String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getText(
  formData: FormData,
  field: string
): string {
  return String(formData.get(field) ?? "").trim();
}

export async function createTour(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/en/admin/login");
  }

  // --------------------------------------------------
  // TITLES
  // --------------------------------------------------

  const titleEs = getText(formData, "titleEs");
  const titleEn = getText(formData, "titleEn");

  // Keep the legacy field while the migration is active.
  const title = titleEn;

  // --------------------------------------------------
  // SLUG
  // --------------------------------------------------

  const slug = getText(formData, "slug").toLowerCase();

  // --------------------------------------------------
  // CATEGORY
  // --------------------------------------------------

  const categoryEs = getText(formData, "categoryEs");
  const categoryEn = getText(formData, "categoryEn");

  const category = categoryEn;

  // --------------------------------------------------
  // LOCATION
  // --------------------------------------------------

  const locationEs = getText(formData, "locationEs");
  const locationEn = getText(formData, "locationEn");

  const location = locationEn;

  // --------------------------------------------------
  // DURATION
  // --------------------------------------------------

  const durationEs = getText(formData, "durationEs");
  const durationEn = getText(formData, "durationEn");

  const duration = durationEn;

  // --------------------------------------------------
  // DIFFICULTY
  // --------------------------------------------------

  const difficultyEs = getText(
    formData,
    "difficultyEs"
  );

  const difficultyEn = getText(
    formData,
    "difficultyEn"
  );

  const difficulty = difficultyEn;

  // --------------------------------------------------
  // SHORT DESCRIPTION
  // --------------------------------------------------

  const shortDescriptionEs = getText(
    formData,
    "shortDescriptionEs"
  );

  const shortDescriptionEn = getText(
    formData,
    "shortDescriptionEn"
  );

  const shortDescription = shortDescriptionEn;

  // --------------------------------------------------
  // FULL DESCRIPTION
  // --------------------------------------------------

  const descriptionEs = getText(
    formData,
    "descriptionEs"
  );

  const descriptionEn = getText(
    formData,
    "descriptionEn"
  );

  const description = descriptionEn;

  // --------------------------------------------------
  // INCLUDES
  // --------------------------------------------------

  const includesEs = textToArray(
    formData.get("includesEs")
  );

  const includesEn = textToArray(
    formData.get("includesEn")
  );

  // Legacy field
  const includes = includesEn;

  // --------------------------------------------------
  // WHAT TO BRING
  // --------------------------------------------------

  const whatToBringEs = textToArray(
    formData.get("whatToBringEs")
  );

  const whatToBringEn = textToArray(
    formData.get("whatToBringEn")
  );

  // Legacy field
  const whatToBring = whatToBringEn;

  // --------------------------------------------------
  // IMAGE
  // --------------------------------------------------

  const image = getText(formData, "image");

  const validLocalImage =
    image === "" ||
    /^\/.*\.(jpg|jpeg|png|webp|avif)$/i.test(image);

  const validRemoteImage =
    image === "" ||
    /^https:\/\/.+/i.test(image);

  if (!validLocalImage && !validRemoteImage) {
    redirect(
      "/en/admin/tours/new?error=invalid-image-path"
    );
  }

  // --------------------------------------------------
  // PRICES
  // --------------------------------------------------

  const priceAdultValue = getText(
    formData,
    "priceAdult"
  );

  const priceChildValue = getText(
    formData,
    "priceChild"
  );

  // --------------------------------------------------
  // REQUIRED FIELDS
  // --------------------------------------------------

  if (
    !titleEs ||
    !titleEn ||
    !slug ||
    !categoryEs ||
    !categoryEn ||
    !locationEs ||
    !locationEn ||
    !durationEs ||
    !durationEn ||
    !difficultyEs ||
    !difficultyEn ||
    !shortDescriptionEs ||
    !shortDescriptionEn ||
    !descriptionEs ||
    !descriptionEn ||
    !priceAdultValue
  ) {
    redirect(
      "/en/admin/tours/new?error=missing-required-fields"
    );
  }

  // --------------------------------------------------
  // PRICE VALIDATION
  // --------------------------------------------------

  const priceAdult = Number(priceAdultValue);

  const priceChild =
    priceChildValue === ""
      ? 0
      : Number(priceChildValue);

  if (
    Number.isNaN(priceAdult) ||
    priceAdult < 0 ||
    Number.isNaN(priceChild) ||
    priceChild < 0
  ) {
    redirect(
      "/en/admin/tours/new?error=invalid-price"
    );
  }

  // --------------------------------------------------
  // INSERT TOUR
  // --------------------------------------------------

  const { error } = await supabase
    .from("tours")
    .insert({
      // Title
      title,
      title_es: titleEs,
      title_en: titleEn,

      slug,

      // Category
      category,
      category_es: categoryEs,
      category_en: categoryEn,

      // Location
      location,
      location_es: locationEs,
      location_en: locationEn,

      // Duration
      duration,
      duration_es: durationEs,
      duration_en: durationEn,

      // Difficulty
      difficulty: difficulty || null,
      difficulty_es: difficultyEs || null,
      difficulty_en: difficultyEn || null,

      // Languages / services
      languages: ["English", "Spanish"],
      transportation_included: false,
      meals_included: false,

      // Prices
      price_adult: priceAdult,
      price_child: priceChild,

      // Status
      featured:
        formData.get("featured") === "on",

      active:
        formData.get("active") === "on",

      // Reviews
      rating: 5,
      reviews: 0,

      // Images
      image: image || null,
      gallery: image ? [image] : [],

      // Short description
      short_description: shortDescription,
      short_description_es: shortDescriptionEs,
      short_description_en: shortDescriptionEn,

      // Full description
      description,
      description_es: descriptionEs,
      description_en: descriptionEn,

      // Includes
      includes,
      includes_es: includesEs,
      includes_en: includesEn,

      // What to bring
      what_to_bring: whatToBring,
      what_to_bring_es: whatToBringEs,
      what_to_bring_en: whatToBringEn,
    });

  // --------------------------------------------------
  // DATABASE ERRORS
  // --------------------------------------------------

  if (error) {
    console.error(
      "CREATE TOUR ERROR:",
      error
    );

    if (error.code === "23505") {
      const constraint =
        error.details ??
        error.message ??
        "";

      if (constraint.includes("slug")) {
        redirect(
          "/en/admin/tours/new?error=duplicate-slug"
        );
      }

      if (
        constraint.includes("tours_pkey") ||
        constraint.includes("(id)")
      ) {
        redirect(
          "/en/admin/tours/new?error=duplicate-id"
        );
      }
    }

    redirect(
      "/en/admin/tours/new?error=database-error"
    );
  }

  // --------------------------------------------------
  // SUCCESS
  // --------------------------------------------------

  revalidatePath("/en/admin");
  revalidatePath("/es/admin");

  revalidatePath("/en");
  revalidatePath("/es");

  redirect(
    "/en/admin?success=tour-created"
  );
}