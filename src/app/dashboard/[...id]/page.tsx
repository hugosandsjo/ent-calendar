"use client";

import { useEffect, useState, use } from "react"; // Import 'use' from React
import { getEntry } from "@/src/app/actions/actions";
import Link from "next/link";
import { SelectEntry } from "@/src/db/schema";
import EntryForm from "@/src/app/components/form/EntryForm";
import EntryFormUpdate from "@/src/app/components/form/EntryFormUpdate";
import DetailPage from "@/src/app/components/ui/DetailPage";

type PageProps = {
  params: Promise<{ id: string[] }>;
};
export default function DynamicDashboardPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const pathSegments = resolvedParams.id;
  const [entry, setEntry] = useState<SelectEntry | null>(null);

  const isCreatePage =
    pathSegments.length === 1 && pathSegments[0] === "create";
  const isEditPage = pathSegments.length === 2 && pathSegments[1] === "edit";
  const isDetailPage =
    pathSegments.length === 1 && !isNaN(Number(pathSegments[0]));

  const entryId =
    isDetailPage || isEditPage ? Number(pathSegments[0]) : undefined;

  useEffect(() => {
    if (entryId && (isDetailPage || isEditPage)) {
      const fetchEntry = async () => {
        const data = await getEntry(entryId);
        setEntry(data);
      };
      fetchEntry();
    }
  }, [entryId, isDetailPage, isEditPage]);

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

  if (isDetailPage) {
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
