"use client";

import { useEffect, useState } from "react";
import { getEntry } from "@/src/app/actions/actions";
import Link from "next/link";
import RatingTag from "@/src/app/components/form/RatingTag";

type PageProps = {
  params: Promise<{ entryId: string }>;
};

export default function UpdateEntryPage({ params }: PageProps) {
  const [entry, setEntry] = useState<any>(null);
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

  return (
    <section className="flex justify-center py-14">
      <div className="w-10/12 px-10 py-12 flex flex-col gap-4 border border-black">
        <Link href="/dashboard">
          <div className="hover:opacity-35">Back</div>
        </Link>
        {entry ? (
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl mb-2 leading-tight">{entry.title}</h1>
            <div className="flex gap-x-2 mb-2 text-1xl flex-wrap gap-y-2">
              <h2 className="border rounded-3xl py-1 px-2">{entry.category}</h2>
              {entry.author ? (
                <h2 className="border rounded-3xl py-1 px-2">{entry.author}</h2>
              ) : null}
              <h2 className="border rounded-3xl py-1 px-2">{entry.director}</h2>
              <h2 className="border rounded-3xl py-1 px-2">{entry.year}</h2>
            </div>
            <p className="text-lg">{entry.description}</p>
            <RatingTag rating={entry.rating} />
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <Link href={`/dashboard/${entryId}/edit`}>
          <button className="border hover:bg-sky-300 py-2 px-4 rounded-xl">
            Edit
          </button>
        </Link>
      </div>
    </section>
  );
}
