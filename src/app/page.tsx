import { createClient } from "@/src/lib/supabase/server";
import "./globals.css";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user, show sign-up and login buttons
  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <Link href="/auth/sign-up">
          <button>Sign up</button>
        </Link>
        <Link href="/auth/login">
          <button>Log in</button>
        </Link>
      </main>
    );
  }

  // If user exists, show a welcome message and logout button
  return (
    <main className="flex flex-col items-center min-h-screen text-brand-foreground mt-10 lg:mt-40">
      <section className="flex flex-col px-4 text-center md:px-10 gap-4 justify-center">
        <h1 className="text-3xl">Welcome, {user.email}!</h1>
        <Link href="/dashboard">
          <button>Go to Dashboard</button>
        </Link>
        <form action="/auth/logout" method="post">
          <button type="submit">Log out</button>
        </form>
      </section>
    </main>
  );
}
