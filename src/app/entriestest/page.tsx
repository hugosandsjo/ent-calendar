import "dotenv/config";
import { db } from "@/src/db";
import { entries } from "@/src/db/schema";

export default async function Page() {
  // await db.delete(entries);
  // const entry = await db
  //   .insert(entries)
  //   .values({
  //     title: "Test Entry",
  //     category: "Test Category",
  //     genre: "Test Genre",
  //     year: 2023,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     description: "This is a test entry.",
  //     month: 10,
  //     rating: 5,
  //   })
  //   .returning({ id: entries.id });
  // console.log("Inserted entry:", entry);
  const selectedEntries = await db
    .select({ id: entries.id })
    .from(entries)
    .limit(10);
  console.log("Selected entries:", selectedEntries);

  return <div></div>;
}
