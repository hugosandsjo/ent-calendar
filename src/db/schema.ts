import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const entries = pgTable("entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  genre: text("genre").notNull(),
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  description: text("description").notNull(),
  month: text("month"),
  rating: integer("rating"),
  author: text("author"),
  director: text("director"),
  writer: text("writer"),
  publisher: text("publisher"),
  developer: text("developer"),
});

export type InsertEntry = typeof entries.$inferInsert;
export type SelectEntry = typeof entries.$inferSelect;
