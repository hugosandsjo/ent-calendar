"use client";

import { getUserById } from "@/src/app/actions/actions";
import { useEffect, useState } from "react";

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(1); // Add await here
        console.log("Fetched user:", user);
        setUsers(user); // Set the fetched user data to state
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}
