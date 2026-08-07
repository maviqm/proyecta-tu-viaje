import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/types/testimonial";

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

function mapTestimonial(
  row: TestimonialRow,
  locale: string
): Testimonial {
  const isEnglish = locale === "en";

  return {
    id: row.id,
    name: row.name,
    country: isEnglish ? row.country_en : row.country_es,
    tour: isEnglish ? row.tour_en : row.tour_es,
    tourSlug: row.tour_slug,
    comment: isEnglish ? row.comment_en : row.comment_es,
    rating: Number(row.rating),
    featured: row.featured,
    active: row.active,
    displayOrder: row.display_order,
  };
}

export async function getFeaturedTestimonials(
  locale: string
): Promise<Testimonial[]> {
  const supabase = await createClient();

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
    .eq("active", true)
    .eq("featured", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error loading testimonials:", error);
    return [];
  }

  return (data ?? []).map((row) =>
    mapTestimonial(row as TestimonialRow, locale)
  );
}