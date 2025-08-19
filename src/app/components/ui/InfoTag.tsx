import React from "react";

type InfoTagProps = {
  text?: string | number;
};

export default function InfoTag({ text }: InfoTagProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold border-[1.5px] border-brand-black rounded-lg px-3 py-1">
        {text}
      </h3>
    </div>
  );
}
