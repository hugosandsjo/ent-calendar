import { createClient } from "@/src/lib/supabase/server";
import "./globals.css";
import Link from "next/link";
import DashboardSection from "@/src/app/components/ui/DashboardSection";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user, show sign-up and login buttons
  if (!user) {
    return (
      <main className="flex flex-col items-center min-h-screen pt-20">
        <div className="w-full flex text-center font-karla px-4 mb-10">
          <h1 className="text-5xl font-extrabold leading-[58px] text-brand-book tracking-tight">
            Keep track of your recently watched films, played games or read
            books.
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/auth/sign-up">
            <button className="bg-brand-game p-4 rounded-md">Sign up</button>
          </Link>
          <Link href="/auth/login">
            <button className="bg-brand-movie p-4 rounded-md">Log in</button>
          </Link>
        </div>
      </main>
    );
  }

  // If user exists, show a welcome message and logout button
  return (
    <main className="flex flex-col items-center min-h-screen text-brand-foreground mt-10 lg:mt-40">
      <DashboardSection user={user} />
    </main>
  );
}
