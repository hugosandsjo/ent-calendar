import { createClient } from "@/src/lib/supabase/server";
import "./globals.css";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If no user, show sign-up and login buttons
  if (!user) {
    return (
      <main>
        <a href="/auth/sign-up">
          <button>Sign up</button>
        </a>
        <a href="/auth/login">
          <button>Log in</button>
        </a>
      </main>
    );
  }

  // If user exists, show a welcome message and logout button
  return (
    <main>
      <h1>Welcome, {user.email}!</h1>
      <p>
        <a href="/dashboard">
          <button>Go to Dashboard</button>
        </a>
      </p>
      <p>
        <form action="/auth/logout" method="post">
          <button type="submit">Log out</button>
        </form>
      </p>
    </main>
  );
}
