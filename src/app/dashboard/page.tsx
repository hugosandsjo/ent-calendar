import { createClient } from "@/src/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getEntries } from "@/src/app/actions/actions";
import EntryContainer from "@/src/app/components/ui/EntryContainer";

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

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (!user) {
    return <div>Please log in to see your entries.</div>;
  }

  const data = await getEntries(user.id);

  const entries = Array.isArray(data) ? (data as any[]) : [];

  const uniqueMonths = Array.from(
    new Set(
      entries
        .map((entry) => entry.month?.toLowerCase()) // Use optional chaining
        .filter((month) => month !== null && month !== undefined) // Filter out null/undefined values
    )
  ).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

  console.log("Sorted Unique Months:", uniqueMonths);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard, {user.email}!</p>
      <Link href="/">
        <button>Back to Home</button>
      </Link>
      {uniqueMonths.map((month) => (
        <div key={month}>
          <h1 className="text-6xl mb-8">{capitalizeFirstLetter(month)}</h1>
          <EntryContainer
            month={month}
            entries={entries.filter(
              (entry) => entry.month.toLowerCase() === month
            )} // Filter entries for this month
          />
        </div>
      ))}
    </main>
  );
}
