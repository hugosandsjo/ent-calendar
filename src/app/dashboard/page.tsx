import { createClient } from "@/src/lib/supabase/server";
import Link from "next/link";
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard, {user.email}!</p>
      <Link href="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}
