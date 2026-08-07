"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function deleteTour(formData: FormData) {
  const idValue = String(formData.get("id") ?? "").trim();
  const id = Number(idValue);

  if (!Number.isInteger(id) || id <= 0) {
    redirect("/en/admin?error=invalid-tour-id");
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/en/admin/login");
  }

  const { error } = await supabase
    .from("tours")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("DELETE TOUR ERROR:", error);
    redirect("/en/admin?error=delete-failed");
  }

  revalidatePath("/en/admin");
  redirect("/en/admin?success=tour-deleted");
}