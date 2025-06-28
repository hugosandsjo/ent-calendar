import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { getEntries } from "@/src/app/actions/actions";
import EntrySlider from "@/src/app/components/ui/EntrySlider";
import { SelectEntry } from "@/src/db/schema";
import { capitalizeFirstLetter } from "@/src/lib/utils";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const monthOrder = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  if (!user) {
    return <div>Please log in to see your entries.</div>;
  }

  const data = await getEntries(user.id);

  const entries: SelectEntry[] = data;

  const uniqueMonths = Array.from(
    new Set(
      entries
        .map((entry) => entry.month?.toLowerCase())
        .filter((month) => month !== null && month !== undefined)
    )
  ).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

  return (
    <main className="p-10 flex flex-col gap-10">
      <p>Welcome to your dashboard, {user.email}!</p>

      {uniqueMonths.map((month) => (
        <div key={month}>
          <h1 className="text-5xl mb-8">{capitalizeFirstLetter(month)}</h1>
          <EntrySlider
            month={month}
            entries={entries.filter(
              (entry) => entry.month.toLowerCase() === month
            )}
          />
        </div>
      ))}
    </main>
  );
}
