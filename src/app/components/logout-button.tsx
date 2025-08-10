"use client";

import { createClient } from "@/src/lib/supabase/client";
import { Button } from "@/src/app/components/ui/button";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <Button variant={"outline"} onClick={logout}>
      Logout
    </Button>
  );
}
