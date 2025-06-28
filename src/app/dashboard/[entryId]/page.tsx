"use client";

import { useEffect, useState } from "react";
import { getEntry } from "@/src/app/actions/actions";
import Link from "next/link";
import RatingTag from "@/src/app/components/form/RatingTag";
import { deleteEntry } from "@/src/app/actions/actions";
import { InsertEntry } from "@/src/db/schema";

type PageProps = {
  params: Promise<{ entryId: string }>;
};

export default function UpdateEntryPage({ params }: PageProps) {
  const [entry, setEntry] = useState<InsertEntry>({} as InsertEntry);
  const [entryId, setEntryId] = useState<string>("");

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setEntryId(resolvedParams.entryId);
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (entryId) {
      const fetchEntry = async () => {
        const data = await getEntry(Number(entryId));
        setEntry(data);
      };

      fetchEntry();
    }
  }, [entryId]);

  const handleDeleteClick = async (id: string) => {
    await deleteEntry(Number(id));
  };

  return (
    <section className="flex justify-center py-14">
      <div className="w-10/12 px-10 py-12 flex flex-col gap-4 border border-black">
        <Link href="/dashboard">
          <div className="hover:opacity-35">Back</div>
        </Link>
        {entry ? (
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl leading-tight">{entry.title}</h1>
            <div className="flex gap-x-2 mb-2 text-1xl flex-wrap gap-y-2">
              <h2 className="border rounded-3xl py-1 px-2">{entry.category}</h2>
              {entry.author ? (
                <h2 className="border rounded-3xl py-1 px-2">{entry.author}</h2>
              ) : null}
              {entry.director ? (
                <h2 className="border rounded-3xl py-1 px-2">
                  {entry.director}
                </h2>
              ) : null}
              <h2 className="border rounded-3xl py-1 px-2">{entry.year}</h2>
            </div>
            <RatingTag rating={entry.rating ?? undefined} />
            <p className="text-lg">{entry.description}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <div className="flex gap-4 mt-4">
          <Link href={`/dashboard/${entryId}/edit`}>
            <button className="border hover:bg-sky-300 py-2 px-4 rounded-xl">
              Edit
            </button>
          </Link>
          <div className="flex gap-x-2">
            <button
              className="border hover:bg-red-500 py-2 px-4 rounded-xl"
              onClick={() => handleDeleteClick(entryId)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
