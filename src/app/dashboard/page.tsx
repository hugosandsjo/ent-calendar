import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { getEntries } from "@/src/app/actions/actions";
import EntrySlider from "@/src/app/components/ui/EntrySlider";
import { SelectEntry } from "@/src/db/schema";

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

  const data = await getEntries();

  const entries: SelectEntry[] = data;

  const uniqueMonths = Array.from(
    new Set(
      entries
        .map((entry) => entry.month?.toLowerCase())
        .filter((month) => month !== null && month !== undefined)
    )
  ).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

  return (
    <main className="relative flex flex-col gap-10 overflow-x-hidden">
      <div className="px-4">
        <h2>Welcome to your dashboard, {user.email}!</h2>
      </div>
      {uniqueMonths.map((month) => (
        <section key={month}>
          <EntrySlider
            month={month}
            entries={entries.filter(
              (entry) => entry.month.toLowerCase() === month
            )}
          />
        </section>
      ))}
    </main>
  );
}
