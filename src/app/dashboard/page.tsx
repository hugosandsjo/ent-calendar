import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard, {user.email}!</p>
      <a href="/">
        <button>Back to Home</button>
      </a>
    </div>
  );
}
