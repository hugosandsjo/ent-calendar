import Link from "next/link";
import { User } from "@supabase/supabase-js";
import DashboardBrick from "@/src/app/components/ui/DashboardBrick";

type DashboardSectionProps = {
  user: User | null;
};

export default function DashboardSection({ user }: DashboardSectionProps) {
  return (
    <section className="flex flex-col px-4 text-center md:px-10 gap-4 justify-center bg-yellow-200">
      <h1 className="text-3xl">Welcome, {user?.email}!</h1>
      <Link href="/dashboard">
        <button>Go to Dashboard</button>
      </Link>
      <h2>This is the DashboardSectionComponent</h2>
      <DashboardBrick />
    </section>
  );
}
