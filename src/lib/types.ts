import * as z from "zod/v4";

export const createEntrySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  category: z.string().min(1, "Category is required"),
  genre: z.string().min(1, "Genre is required"),
  year: z.string().min(1, "Year is required"),
  description: z.string().optional(),
  month: z.string().min(1, "Month is required"),
  rating: z.number().optional(),
  // Optional conditional fields
  author: z.string().optional(),
  director: z.string().optional(),
  writer: z.string().optional(),
  publisher: z.string().optional(),
  developer: z.string().optional(),
});

export type TCreateEntrySchema = z.infer<typeof createEntrySchema>;
