"use client";

import React, { useState, useEffect, useRef } from "react";
import Entry from "@/src/app/components/ui/Entry";
import { SelectEntry } from "@/src/db/schema";
import { ArrowLeftIcon } from "@/src/app/components/Icons";
import { capitalizeFirstLetter } from "@/src/lib/utils";

type EntrySliderProps = {
  month: string;
  entries: SelectEntry[];
};

function EntrySlider({ month, entries }: EntrySliderProps) {
  const [filteredEntries, setFilteredEntries] =
    useState<SelectEntry[]>(entries);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const entryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredEntries(entries.filter((entry) => entry.month === month));
  }, [entries, month]);

  const scrollByOneEntry = (direction: "next" | "prev") => {
    const container = scrollContainerRef.current;
    const entry = entryRef.current;
    if (!container || !entry) return;

    const entryWidth =
      entry.offsetWidth + parseFloat(getComputedStyle(entry).marginRight);
    const scrollAmount = direction === "next" ? entryWidth : -entryWidth;

    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative">
      <div className="flex gap-2 justify-between items-center mb-4">
        <h1 className="text-4xl">{capitalizeFirstLetter(month)}</h1>
        <div className="flex gap-2 items-center">
          <button
            className="flex justify-center items-center hover:opacity-60 border-2 border-black rounded-full px-2 py-2"
            onClick={() => scrollByOneEntry("prev")}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <button
            className="flex justify-center items-center hover:opacity-60 border-2 border-black rounded-full px-2 py-2"
            onClick={() => scrollByOneEntry("next")}
          >
            <ArrowLeftIcon className="w-6 h-6 rotate-180" />
          </button>
        </div>
      </div>
      <div
        className="flex w-[calc(100%+6rem)] gap-6 overflow-x-auto first:pl-10 last:pr-10 scrollbar-none"
        ref={scrollContainerRef}
      >
        {filteredEntries.map((entry, index) => (
          <div key={entry.id} ref={index === 0 ? entryRef : null}>
            <Entry {...entry} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default EntrySlider;
