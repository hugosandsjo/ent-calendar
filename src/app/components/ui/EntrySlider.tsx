"use client";

import React, { useState, useEffect } from "react";
import Entry from "@/src/app/components/ui/Entry";
import { SelectEntry } from "@/src/db/schema";

type EntrySliderProps = {
  month: string;
  entries: SelectEntry[];
};

function EntrySlider({ month, entries }: EntrySliderProps) {
  const [filteredEntries, setFilteredEntries] =
    useState<SelectEntry[]>(entries);

  useEffect(() => {
    setFilteredEntries(entries.filter((entry) => entry.month === month));
  }, [entries, month]);

  return (
    <section className="relative -left-10">
      <div className="flex w-[calc(100%+6rem)] gap-6 overflow-x-auto first:pl-10 last:pr-10 scrollbar-none">
        {filteredEntries.map((entry) => (
          <Entry key={entry.id} {...entry} />
        ))}
      </div>
    </section>
  );
}

export default EntrySlider;
