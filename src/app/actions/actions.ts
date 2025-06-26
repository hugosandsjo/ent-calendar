"use server";

import { redirect } from "next/navigation";
import { db } from "@/src/db";
import { entries } from "@/src/db/schema";
import { createClient } from "@/src/lib/supabase/server";
import { eq } from "drizzle-orm";

export const addEntry = async (formData: FormData) => {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  // Add this debug log to check user.id
  console.log("User ID:", user.id);
  console.log("User object:", user);

  const title = formData.get("title")?.toString() || null;
  const category = formData.get("category")?.toString() || null;
  const genre = formData.get("genre")?.toString() || null;
  const yearStr = formData.get("year")?.toString();
  const year = yearStr ? parseInt(yearStr, 10) : null;
  const description = formData.get("description")?.toString() || null;
  const month = formData.get("month")?.toString() || null;
  const ratingStr = formData.get("rating")?.toString();
  const rating = ratingStr ? parseInt(ratingStr, 10) : null;

  console.log("Form data debug:", {
    title,
    category,
    genre,
    year,
    description,
    month,
    rating,
    formDataEntries: Object.fromEntries(formData.entries()),
    userId: user.id,
  });

  let author = null;
  let director = null;
  let writer = null;
  let publisher = null;
  let developer = null;

  if (category === "Book") {
    author = formData.get("author")?.toString() || null;
  } else if (category === "Movie" || category === "Series") {
    director = formData.get("director")?.toString() || null;
    writer = formData.get("writer")?.toString() || null;
  } else if (category === "Game") {
    publisher = formData.get("publisher")?.toString() || null;
    developer = formData.get("developer")?.toString() || null;
  }

  if (!title || !category || !genre || !year || !description) {
    throw new Error("Missing required form data");
  }

  console.log("About to insert with user_id:", user.id);

  await db.insert(entries).values({
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
    user_id: user.id,
  });

  redirect("/dashboard");
};

export const getEntries = async (userId: string | null | undefined) => {
  try {
    if (!userId) {
      throw new Error("User sub is required to fetch entries.");
    }

    //  const result = await sql`
    //    SELECT * FROM entries WHERE user_sub = ${userSub}
    //  `;

    const result = await db
      .select()
      .from(entries)
      .where(eq(entries.user_id, userId));
    console.log("getEntries result:", result);
    //  const entries = result.rows;
    //  console.log("This is a test", entries);
    return result;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return { success: false, error: "Failed to fetch entries." };
  }
};

export const getEntry = async (id: number) => {
  console.log("getEntry", id);
  //   const result = await sql`SELECT * FROM entries WHERE id = ${id}`;
  //   const entries = result.rows;
  //   return entries[0];
};

export const getUpdateEntry = async (id: number) => {
  const entry = id;
  console.log("getUpdateEntry", entry);
  //   const result = await sql`SELECT * FROM entries WHERE id = ${id}`;
  //   const entry = result.rows[0];
  //   console.log("getUpdateEntry", entry);
  //   return {
  //     id: entry.id,
  //     title: entry.title,
  //     category: entry.category,
  //     genre: entry.genre,
  //     year: entry.year,
  //     description: entry.description,
  //     author: entry.author,
  //     director: entry.director,
  //     writer: entry.writer,
  //     publisher: entry.publisher,
  //     developer: entry.developer,
  //     month: entry.month,
  //   };
};

export const updateEntry = async (id: number, formData: FormData) => {
  console.log("updateEntry", id);
  console.log("Form data:", Object.fromEntries(formData.entries()));
  // const title = formData.get("title") as string | null;
  // const category = formData.get("category") as string | null;
  // const genre = formData.get("genre") as string | null;
  // const year = formData.get("year") as number | null;
  // const description = formData.get("description") as string | null;
  // const month = formData.get("month") as string | null;
  // const rating = formData.get("rating") as number | null;
  // let author = null;
  // let director = null;
  // let writer = null;
  // let publisher = null;
  // let developer = null;
  // if (category === "Book") {
  //   author = formData.get("author") as string | null;
  // } else if (category === "Movie" || category === "Series") {
  //   director = formData.get("director") as string | null;
  //   writer = formData.get("writer") as string | null;
  // } else if (category === "Game") {
  //   publisher = formData.get("publisher") as string | null;
  //   developer = formData.get("developer") as string | null;
  // }
  // if (!title || !category || !genre || !year || !description || !month) {
  //   throw new Error("Missing required form data");
  // }
  //   await sql`
  //   UPDATE entries
  //   SET
  //     title = ${title},
  //     category = ${category},
  //     genre = ${genre},
  //     year = ${year},
  //     description = ${description},
  //     month = ${month},
  //     author = ${author},
  //     director = ${director},
  //     writer = ${writer},
  //     publisher = ${publisher},
  //     developer = ${developer},
  //     rating = ${rating}
  //   WHERE id = ${id}
  // `;
  //   redirect("/dashboard");
};

export const deleteEntry = async (id: number) => {
  console.log("deleteEntry", id);
  //   await sql`DELETE FROM entries WHERE id = ${id}`;
};
