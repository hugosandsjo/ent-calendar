import Link from "next/link";
import { User } from "@supabase/supabase-js";
import DashboardBrick from "@/src/app/components/ui/DashboardBrick";

type DashboardSectionProps = {
  user: User | null;
};

export default function DashboardSection({ user }: DashboardSectionProps) {
  return (
    <section className="flex flex-col px-4 text-center md:px-10 gap-8 justify-center p-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl md:text-6xl font-karla font-extrabold tracking-tight text-brand-book">
          Welcome, {user?.email}!
        </h1>
        <Link href="/dashboard">
          <button className="bg-brand-black text-white hover:opacity-70 p-4 rounded-lg">
            Go to Dashboard
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-12 row-start-2 items-center gap-4">
        <DashboardBrick title="Total posts:" stat={42} />
        <DashboardBrick title="This month:" stat={3} />
        <DashboardBrick title="Favorite genre" stat={"Books"} />
      </div>
    </section>
  );
}
