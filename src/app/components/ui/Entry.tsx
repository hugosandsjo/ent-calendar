import React from "react";
import InfoTag from "@/src/app/components/ui/InfoTag";
import GenreTag from "@/src/app/components/ui/GenreTag";
import Link from "next/link";
import RatingTag from "@/src/app/components/form/RatingTag";
import { SelectEntry } from "@/src/db/schema";
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
      <div className="w-[28rem] py-8 px-8 flex flex-col gap-3 md:hover:bg-purple-100 justify-between bg-brand-game rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl">{title}</h1>
          <ArrowOutwardIcon className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-x-1.5 gap-y-2.5">
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
        <p className="line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}

export default Entry;
