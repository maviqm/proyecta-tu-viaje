"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function getRequiredText(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

export async function createTestimonial(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/en/admin/login");
  }

  const name = getRequiredText(formData, "name");
  const countryEs = getRequiredText(formData, "countryEs");
  const countryEn = getRequiredText(formData, "countryEn");
  const tourEs = getRequiredText(formData, "tourEs");
  const tourEn = getRequiredText(formData, "tourEn");
  const tourSlug = getRequiredText(formData, "tourSlug");
  const commentEs = getRequiredText(formData, "commentEs");
  const commentEn = getRequiredText(formData, "commentEn");

  const rating = Number(formData.get("rating"));
  const displayOrder = Number(formData.get("displayOrder"));

  const featured = formData.get("featured") === "on";
  const active = formData.get("active") === "on";

  if (
    !name ||
    !countryEs ||
    !countryEn ||
    !tourEs ||
    !tourEn ||
    !commentEs ||
    !commentEn
  ) {
    redirect(
      "/en/admin/testimonials/new?error=missing-required-fields"
    );
  }

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    redirect("/en/admin/testimonials/new?error=invalid-rating");
  }

  if (!Number.isInteger(displayOrder) || displayOrder < 0) {
    redirect(
      "/en/admin/testimonials/new?error=invalid-display-order"
    );
  }

  const { error } = await supabase
    .from("testimonials")
    .insert({
      name,
      country_es: countryEs,
      country_en: countryEn,
      tour_es: tourEs,
      tour_en: tourEn,
      tour_slug: tourSlug || null,
      comment_es: commentEs,
      comment_en: commentEn,
      rating,
      featured,
      active,
      display_order: displayOrder,
    });

  if (error) {
    console.error("CREATE TESTIMONIAL ERROR:", error);

    redirect(
      "/en/admin/testimonials/new?error=database-error"
    );
  }

  redirect("/en/admin/testimonials");
}