import React from "react";

type GenreTagProps = {
  text?: string | number;
};

function GenreTag({ text }: GenreTagProps) {
  return (
    <div className="py-1">
      <h3 className="text-s font-medium">{text}</h3>
    </div>
  );
}

export default GenreTag;
