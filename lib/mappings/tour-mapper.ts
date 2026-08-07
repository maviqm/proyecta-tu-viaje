import type { Tour } from "@/lib/types/tour";

export type TourRow = {
  id: number;
  slug: string;

  title: string | null;
  title_es: string | null;
  title_en: string | null;

  category: string | null;
  category_es: string | null;
  category_en: string | null;

  location: string | null;
  location_es: string | null;
  location_en: string | null;

  duration: string | null;
  duration_es: string | null;
  duration_en: string | null;

  difficulty: string | null;
  difficulty_es: string | null;
  difficulty_en: string | null;

  languages: string[] | null;

  transportation_included: boolean | null;
  meals_included: boolean | null;

  price_adult: number | string | null;
  price_child: number | string | null;

  featured: boolean | null;
  active: boolean | null;

  rating: number | string | null;
  reviews: number | string | null;

  image: string | null;
  gallery: string[] | null;

  short_description: string | null;
  short_description_es: string | null;
  short_description_en: string | null;

  description: string | null;
  description_es: string | null;
  description_en: string | null;

  includes: string[] | null;
  includes_es: string[] | null;
  includes_en: string[] | null;

  what_to_bring: string[] | null;
  what_to_bring_es: string[] | null;
  what_to_bring_en: string[] | null;

  created_at?: string | null;
  updated_at?: string | null;
};

function toNumber(
  value: number | string | null | undefined,
  fallback = 0
): number {
  const parsed = Number(value);

  return Number.isFinite(parsed)
    ? parsed
    : fallback;
}

function localizedText(
  locale: string,
  spanishValue: string | null,
  englishValue: string | null,
  fallbackValue: string | null
): string {
  if (locale === "es") {
    return (
      spanishValue ??
      fallbackValue ??
      englishValue ??
      ""
    );
  }

  return (
    englishValue ??
    fallbackValue ??
    spanishValue ??
    ""
  );
}

function localizedList(
  locale: string,
  spanishValue: string[] | null,
  englishValue: string[] | null,
  fallbackValue: string[] | null
): string[] {
  if (locale === "es") {
    return (
      spanishValue ??
      fallbackValue ??
      englishValue ??
      []
    );
  }

  return (
    englishValue ??
    fallbackValue ??
    spanishValue ??
    []
  );
}

/**
 * Translates the language names stored in Supabase.
 *
 * We keep the database values standardized in English
 * and translate them only for presentation.
 */
function localizedLanguages(
  languages: string[] | null,
  locale: string
): string[] {
  const values = languages ?? [];

  if (locale !== "es") {
    return values;
  }

  const translations: Record<string, string> = {
    English: "Inglés",
    Spanish: "Español",
    French: "Francés",
    German: "Alemán",
    Italian: "Italiano",
    Portuguese: "Portugués",
  };

  return values.map(
    (language) =>
      translations[language] ?? language
  );
}

export function mapTourRow(
  row: TourRow,
  locale = "en"
): Tour {
  return {
    id: row.id,
    slug: row.slug,

    // TITLE
    title: localizedText(
      locale,
      row.title_es,
      row.title_en,
      row.title
    ),

    // CATEGORY
    category: localizedText(
      locale,
      row.category_es,
      row.category_en,
      row.category
    ),

    // LOCATION
    location: localizedText(
      locale,
      row.location_es,
      row.location_en,
      row.location
    ),

    // DURATION
    duration: localizedText(
      locale,
      row.duration_es,
      row.duration_en,
      row.duration
    ),

    // DIFFICULTY
    difficulty: localizedText(
      locale,
      row.difficulty_es,
      row.difficulty_en,
      row.difficulty
    ),

    // LANGUAGES
    languages: localizedLanguages(
      row.languages,
      locale
    ),

    // SERVICES
    transportationIncluded:
      row.transportation_included ?? false,

    mealsIncluded:
      row.meals_included ?? false,

    // PRICES
    priceAdult: toNumber(
      row.price_adult
    ),

    priceChild: toNumber(
      row.price_child
    ),

    // STATUS
    featured:
      row.featured ?? false,

    active:
      row.active ?? false,

    // REVIEWS
    rating:
      toNumber(row.rating),

    reviews:
      toNumber(row.reviews),

    // IMAGES
    image:
      row.image ?? "",

    gallery:
      row.gallery ?? [],

    // SHORT DESCRIPTION
    shortDescription: localizedText(
      locale,
      row.short_description_es,
      row.short_description_en,
      row.short_description
    ),

    // FULL DESCRIPTION
    description: localizedText(
      locale,
      row.description_es,
      row.description_en,
      row.description
    ),

    // INCLUDES
    includes: localizedList(
      locale,
      row.includes_es,
      row.includes_en,
      row.includes
    ),

    // WHAT TO BRING
    whatToBring: localizedList(
      locale,
      row.what_to_bring_es,
      row.what_to_bring_en,
      row.what_to_bring
    ),

    // DATES
    createdAt:
      row.created_at ?? undefined,

    updatedAt:
      row.updated_at ?? undefined,
  };
}