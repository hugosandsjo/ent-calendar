// import { useEffect, useState, use } from "react";
import { getEntry } from "@/src/app/actions/actions";
import Link from "next/link";
import EntryForm from "@/src/app/components/form/EntryForm";
import EntryFormUpdate from "@/src/app/components/form/EntryFormUpdate";
import DetailPage from "@/src/app/components/ui/DetailPage";
import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string[] }>;
};
export default async function DynamicDashboardPage({ params }: PageProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const resolvedParams = await params;
  const pathSegments = resolvedParams.id;
  // const [entry, setEntry] = useState<SelectEntry | null>(null);
  // const entry = await getEntry(id))

  const isCreatePage =
    pathSegments.length === 1 && pathSegments[0] === "create";
  const isEditPage = pathSegments.length === 2 && pathSegments[1] === "edit";
  const isDetailPage =
    pathSegments.length === 1 && !isNaN(Number(pathSegments[0]));

  const entryId =
    isDetailPage || isEditPage ? Number(pathSegments[0]) : undefined;

  if (isCreatePage) {
    return (
      <section className="flex w-screen px-4 md:px-8 lg:justify-center mb-12">
        <EntryForm />
      </section>
    );
  }

  if (isEditPage) {
    if (!entryId) return <p>Loading...</p>; // Or handle error
    return (
      <section className="flex w-screen px-4 md:px-8 lg:justify-center mb-12">
        <EntryFormUpdate id={entryId} />
      </section>
    );
  }

  if (entryId && isDetailPage) {
    const entry = await getEntry(entryId);
    if (!entry) return <p>Loading...</p>;

    return (
      <section className="flex justify-center px-4 md:px-20 py-36">
        <DetailPage entry={entry} entryId={entryId} />
      </section>
    );
  }

  // Handle unknown paths or render a 404 page
  return (
    <section className="flex flex-col w-screen items-center justify-center mb-12">
      <h1>Page Not Found</h1>
      <p>The requested dashboard page does not exist.</p>
      <Link href="/dashboard">Go to Dashboard Home</Link>
    </section>
  );
}
