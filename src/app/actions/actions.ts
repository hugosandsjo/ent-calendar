"use server";

import { redirect } from "next/navigation";
import { SelectEntry } from "@/src/db/schema";
import { createClient } from "@/src/lib/supabase/server";
import { z } from "zod/v4";
import { createEntrySchema, TCreateEntrySchema } from "@/src/lib/types";

type ServerActionResponse =
  | { success: true }
  | { success: false; message: string };

export const addEntry = async (
  formValues: TCreateEntrySchema
): Promise<ServerActionResponse> => {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const result = createEntrySchema.safeParse(formValues);

  if (!result.success) {
    console.error("Server-side validation failed:", result.error.issues);
    return {
      success: false,
      message: "Validation failed. Please check your input.",
    };
  }

  const {
    title,
    category,
    genre,
    year,
    description,
    month,
    rating,
    author,
    director,
    writer,
    publisher,
    developer,
  } = result.data;

  await supabase.from("entries").insert({
    title,
    category,
    genre,
    year,
    description,
    month,
    author: author ?? null,
    director: director ?? null,
    writer: writer ?? null,
    publisher: publisher ?? null,
    developer: developer ?? null,
    rating: rating ?? null,
    user_id: user.id,
  });

  redirect("/dashboard");
};

export const getEntries = async (): Promise<SelectEntry[]> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("entries").select("*");
    if (error) {
      console.error("Error fetching entries with RLS:", error);
      throw error;
    }
    return (data || []) as SelectEntry[];
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
};

export const getEntry = async (id: number): Promise<SelectEntry | null> => {
  const supabase = await createClient();
  try {
    const { data } = await supabase
      .from("entries")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      return null;
    }

    return data as SelectEntry;
  } catch (error) {
    console.error("Error fetching single entry:", error);
    return null;
  }
};

export const getUpdateEntry = async (
  entryId: number
): Promise<SelectEntry | null> => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("entries")
      .select("*")
      .eq("id", entryId)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error fetching entry for update with RLS:", error);
      throw error;
    }

    if (!data) {
      console.log("No entry found for update or RLS blocked access:", entryId);
      return null;
    }

    console.log("getUpdateEntry result:", data);

    return {
      id: data.id,
      title: data.title,
      category: data.category,
      genre: data.genre,
      year: data.year,
      description: data.description,
      author: data.author,
      director: data.director,
      writer: data.writer,
      publisher: data.publisher,
      developer: data.developer,
      month: data.month,
      rating: data.rating,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
      user_id: data.user_id,
    };
  } catch (error) {
    console.error("Error fetching entry for update:", error);
    return null;
  }
};

export const updateEntry = async (
  id: number,
  formData: FormData
): Promise<void> => {
  const supabase = await createClient();

  const title = formData.get("title")?.toString() || null;
  const category = formData.get("category")?.toString() || null;
  const genre = formData.get("genre")?.toString() || null;
  const yearStr = formData.get("year")?.toString();
  const year = yearStr ? parseInt(yearStr, 10) : null;
  const description = formData.get("description")?.toString() || null;
  const month = formData.get("month")?.toString() || null;
  const ratingStr = formData.get("rating")?.toString();
  const rating = ratingStr ? parseInt(ratingStr, 10) : null;

  let author = null;
  let director = null;
  let writer = null;
  let publisher = null;
  let developer = null;
  if (category === "Book") {
    author = formData.get("author") as string | null;
  } else if (category === "Movie" || category === "Series") {
    director = formData.get("director") as string | null;
    writer = formData.get("writer") as string | null;
  } else if (category === "Game") {
    publisher = formData.get("publisher") as string | null;
    developer = formData.get("developer") as string | null;
  }
  if (!title || !category || !genre || !year || !description || !month) {
    throw new Error("Missing required form data");
  }

  const { error } = await supabase
    .from("entries")
    .update({
      title,
      category,
      genre,
      year,
      description,
      month,
      author,
      director,
      writer,
      publisher,
      developer,
      rating,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating entry with RLS:", error);
    throw new Error("Failed to update entry.");
  }

  redirect("/dashboard");
};

export const deleteEntry = async (id: number): Promise<void> => {
  const supabase = await createClient();
  const { error } = await supabase.from("entries").delete().eq("id", id);
  if (error) {
    console.error("Error deleting entry with RLS:", error);
    throw new Error("Failed to delete entry.");
  }

  redirect("/dashboard");
};
