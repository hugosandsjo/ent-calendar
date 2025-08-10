import React from "react";
import InfoTag from "@/src/app/components/ui/InfoTag";
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
  const categoryBg: Record<string, string> = {
    Game: "bg-brand-game",
    Book: "bg-brand-book",
    Movie: "bg-brand-movie",
    Music: "bg-brand-music",
    // fallback/default style
    default: "bg-brand-gray text-black",
  };

  const backgroundClass = categoryBg[category] || categoryBg.default;

  return (
    <Link href={`dashboard/${id}`}>
      <div
        className={`${backgroundClass} w-[28rem] py-9 px-8 flex flex-col gap-4 md:hover:bg-purple-100 justify-between rounded-xl text-white`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-karla font-extrabold tracking-tighter">
            {title}
          </h1>
          <ArrowOutwardIcon className="w-8 h-8 fill-white" />
        </div>
        <div className="flex flex-col gap-3 font-extrabold">
          <div className="flex flex-wrap gap-x-1.5 gap-y-2.5">
            <InfoTag text={category} />
            <InfoTag text={year} />
            <InfoTag text={genre} />
            {[author, director, writer, developer, publisher].map(
              (text, index) =>
                text ? <InfoTag key={index} text={text} /> : null
            )}
          </div>
          <RatingTag rating={rating || undefined} />
          <div className="flex flex-col gap-3">
            <p className="line-clamp-3 font-normal">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Entry;
