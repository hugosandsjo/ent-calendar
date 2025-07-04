"use client";

import React, { useState, useEffect, useRef } from "react";
import Entry from "@/src/app/components/ui/Entry";
import { SelectEntry } from "@/src/db/schema";
import { ArrowLeftIcon } from "@/src/app/components/Icons";

type EntrySliderProps = {
  month: string;
  entries: SelectEntry[];
};

function EntrySlider({ month, entries }: EntrySliderProps) {
  const [filteredEntries, setFilteredEntries] =
    useState<SelectEntry[]>(entries);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredEntries(entries.filter((entry) => entry.month === month));
  }, [entries, month]);

  const scrollToNextSnapPoint = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const clientWidth = scrollContainerRef.current.clientWidth;
      const nextSnapPoint = scrollLeft + clientWidth;
      scrollContainerRef.current.scrollTo({
        left: nextSnapPoint,
        behavior: "smooth",
      });
    }
  };

  const scrollToPreviousSnapPoint = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const clientWidth = scrollContainerRef.current.clientWidth;
      const previousSnapPoint = Math.max(scrollLeft - clientWidth, 0);
      scrollContainerRef.current.scrollTo({
        left: previousSnapPoint,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative -left-10">
      <div className="flex gap-2">
        <button
          className="flex justify-center items-center hover:opacity-60 border-2 border-black rounded-full px-2 py-2"
          onClick={scrollToPreviousSnapPoint}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <button
          className="flex justify-center items-center hover:opacity-60 border-2 border-black rounded-full px-2 py-2"
          onClick={scrollToNextSnapPoint}
        >
          <ArrowLeftIcon className="w-6 h-6 rotate-180" />
        </button>
      </div>
      <div
        className="flex w-[calc(100%+6rem)] gap-6 overflow-x-auto first:pl-10 last:pr-10"
        ref={scrollContainerRef}
      >
        {filteredEntries.map((entry) => (
          <Entry key={entry.id} {...entry} />
        ))}
      </div>
    </section>
  );
}

export default EntrySlider;
