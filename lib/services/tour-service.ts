import { createClient } from "@/lib/supabase/server";

import {
  mapTourRow,
  type TourRow,
} from "@/lib/mappings/tour-mapper";

import type { Tour } from "@/lib/types/tour";

const tourColumns = `
  id,
  slug,

  title,
  title_es,
  title_en,

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

  languages,
  transportation_included,
  meals_included,

  price_adult,
  price_child,

  featured,
  active,

  rating,
  reviews,

  image,
  gallery,

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
  what_to_bring_en,

  created_at,
  updated_at
`;

export async function getTours(
  locale = "en"
): Promise<Tour[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tours")
    .select(tourColumns)
    .eq("active", true)
    .order("featured", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    console.error("GET TOURS ERROR:", error);
    return [];
  }

  return (data as TourRow[]).map((row) =>
    mapTourRow(row, locale)
  );
}

export async function getFeaturedTours(
  locale = "en"
): Promise<Tour[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tours")
    .select(tourColumns)
    .eq("active", true)
    .eq("featured", true)
    .order("title", { ascending: true });

  if (error) {
    console.error("GET FEATURED TOURS ERROR:", error);
    return [];
  }

  return (data as TourRow[]).map((row) =>
    mapTourRow(row, locale)
  );
}

export async function getTourBySlug(
  slug: string,
  locale = "en"
): Promise<Tour | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tours")
    .select(tourColumns)
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    console.error("GET TOUR BY SLUG ERROR:", error);
    return null;
  }

  return data
    ? mapTourRow(data as TourRow, locale)
    : null;
}

export async function getTourOptions(
  locale = "en"
): Promise<Pick<Tour, "id" | "title" | "slug">[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tours")
    .select(`
      id,
      slug,
      title,
      title_es,
      title_en
    `)
    .eq("active", true)
    .order("title", { ascending: true });

  if (error) {
    console.error("GET TOUR OPTIONS ERROR:", error);
    return [];
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title:
      locale === "es"
        ? row.title_es ?? row.title ?? row.title_en ?? ""
        : row.title_en ?? row.title ?? row.title_es ?? "",
  }));
}