// import "dotenv/config";
// import { drizzle } from "drizzle-orm/postgres-js";
// import { eq } from "drizzle-orm";
// import { entries } from "./schema";

// const db = drizzle(process.env.DATABASE_URL!);

// async function main() {
//   const user: typeof entries.$inferInsert = {
//     title: "Title from drizzle",
//   };

//   await db.insert(entries).values(user);
//   console.log("New entry created!");

//   const trueentries = await db.select().from(entries);
//   console.log("Getting all entries from the database: ", trueentries);
//   /*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */

//   await db
//     .update(entries)
//     .set({
//       title: "Updated title from drizzle",
//     })
//     .where(eq(entries.id, entries.id));
//   console.log("Entry info updated!");

//   //   await db.delete(entries).where(eq(entries.id, entries.id));
//   //   console.log("Entry deleted!");
// }

// main();

import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env" }); // or .env.local

const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle({ client });
