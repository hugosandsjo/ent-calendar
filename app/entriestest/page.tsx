// "use client";

// import { createClient } from "@/lib/supabase/client";
// import { useEffect, useState } from "react";

// export const dynamic = "force-dynamic";

// export default function Page() {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [notes, setNotes] = useState<any[] | null>(null);
//   const supabase = createClient();

//   useEffect(() => {
//     const getData = async () => {
//       const { data } = await supabase.from("entries").select();
//       setNotes(data);
//     };
//     getData();
//   }, []);

//   return <pre>{JSON.stringify(notes, null, 2)}</pre>;
// }
