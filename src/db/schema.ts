import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const entries = pgTable("entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  genre: text("genre").notNull(),
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull(),
  description: text("description").notNull(),
  mont: integer("mont").notNull(),
  rating: integer("rating").notNull(),
});

// export const usersTable = pgTable("users_table", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   age: integer("age").notNull(),
//   email: text("email").notNull().unique(),
// });

// export const postsTable = pgTable("posts_table", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   content: text("content").notNull(),
//   userId: integer("user_id")
//     .notNull()
//     .references(() => usersTable.id, { onDelete: "cascade" }),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at")
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;

export type InsertEntry = typeof entries.$inferInsert;
export type SelectEntry = typeof entries.$inferSelect;
