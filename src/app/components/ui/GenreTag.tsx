import React from "react";

type GenreTagProps = {
  text?: string | number;
};

function GenreTag({ text }: GenreTagProps) {
  return (
    <div className="border-2 border-black rounded-full py-1 px-3">
      <h3 className="text-s font-medium">{text}</h3>
    </div>
  );
}

export default GenreTag;
