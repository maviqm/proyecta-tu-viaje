"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function getRequiredText(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

export async function updateTestimonial(
  id: number,
  locale: string,
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(`/${locale}/admin/login`);
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

  const editPath = `/${locale}/admin/testimonials/${id}/edit`;

  if (
    !name ||
    !countryEs ||
    !countryEn ||
    !tourEs ||
    !tourEn ||
    !commentEs ||
    !commentEn
  ) {
    redirect(`${editPath}?error=missing-required-fields`);
  }

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    redirect(`${editPath}?error=invalid-rating`);
  }

  if (!Number.isInteger(displayOrder) || displayOrder < 0) {
    redirect(`${editPath}?error=invalid-display-order`);
  }

  const { error } = await supabase
    .from("testimonials")
    .update({
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
    })
    .eq("id", id);

  if (error) {
    console.error("UPDATE TESTIMONIAL ERROR:", error);

    redirect(`${editPath}?error=database-error`);
  }

  redirect(`/${locale}/admin/testimonials`);
}

export async function deleteTestimonial(
  id: number,
  locale: string
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(`/${locale}/admin/login`);
  }

  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE TESTIMONIAL ERROR:", error);

    redirect(
      `/${locale}/admin/testimonials/${id}/edit?error=delete-error`
    );
  }

  redirect(`/${locale}/admin/testimonials`);
}