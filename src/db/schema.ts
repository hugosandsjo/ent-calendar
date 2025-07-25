import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

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
  month: text("month").notNull(),
  rating: integer("rating"),
  author: text("author"),
  director: text("director"),
  writer: text("writer"),
  publisher: text("publisher"),
  developer: text("developer"),
  user_id: uuid("user_id").notNull(),
});

export type InsertEntry = typeof entries.$inferInsert;
export type SelectEntry = typeof entries.$inferSelect;
