import React from "react";
import InfoTag from "@/src/app/components/ui/InfoTag";
import GenreTag from "@/src/app/components/ui/GenreTag";
import Link from "next/link";
import RatingTag from "@/src/app/components/form/RatingTag";
import { SelectEntry } from "@/src/db/schema";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { ArrowOutwardIcon } from "@/src/app/components/Icons";

function Entry({
  id,
  title,
  category,
  genre,
  year,
  description,
  author,
  director,
  writer,
  publisher,
  developer,
  rating,
}: SelectEntry) {
  return (
    <Link href={`dashboard/${id}`}>
      <div className="min-w-96 max-w-lg py-8 px-10 flex flex-col gap-4 hover:bg-gray-200 justify-between border border-black">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl">{title}</h1>

          <ArrowOutwardIcon className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-x-2">
            <InfoTag text={category} />
            <InfoTag text={year} />
            {[author, director, writer, developer, publisher].map(
              (text, index) =>
                text ? <InfoTag key={index} text={text} /> : null
            )}
          </div>
          <div className="flex flex-col gap-4">
            <RatingTag rating={rating || undefined} />
            <article className="flex">
              <GenreTag text={genre} />
            </article>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default Entry;
