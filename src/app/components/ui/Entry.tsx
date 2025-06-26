import React from "react";
import InfoTag from "@/src/app/components/ui/InfoTag";
import GenreTag from "@/src/app/components/ui/GenreTag";
import Link from "next/link";
import RatingTag from "@/src/app/components/form/RatingTag";
import { SelectEntry } from "@/src/db/schema";

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
    <div className="min-w-96 max-w-lg py-8 px-10 flex flex-col gap-4 justify-between border border-black">
      <h1 className="text-4xl">{title}</h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-x-2">
          <InfoTag text={category} />
          <InfoTag text={year} />
          {[author, director, writer, developer, publisher].map((text, index) =>
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

      <div className="flex gap-2 justify-between">
        <div className="flex">
          <Link href={`dashboard/${id}`}>
            <button className="border hover:bg-green-700 py-2 px-4 rounded-xl">
              Go to entry
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Entry;
