"use client";

import React, { useState, useEffect } from "react";
import Entry, { EntryProps } from "@/src/app/components/ui/Entry";
import { SelectEntry } from "@/src/db/schema";

type EntryContainerProps = {
  month: string;
  entries: SelectEntry[];
};

function EntryContainer({ month, entries }: EntryContainerProps) {
  const [filteredEntries, setFilteredEntries] =
    useState<SelectEntry[]>(entries);

  useEffect(() => {
    setFilteredEntries(entries.filter((entry) => entry.month === month));
  }, [entries, month]);

  const updateUIAfterDelete = (id: number) => {
    setFilteredEntries(filteredEntries.filter((entry) => entry.id !== id));
  };

  return (
    <section className="relative -left-12 ">
      <div className="flex w-[calc(100%+6rem)] gap-6 overflow-x-auto first:pl-10 last:pr-10 scrollbar-hide">
        {filteredEntries.map((entry) => (
          <Entry
            key={entry.id}
            {...entry}
            onDelete={updateUIAfterDelete}
            onUpdate={updateUIAfterDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default EntryContainer;
