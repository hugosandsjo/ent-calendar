import React from "react";

type InfoTagProps = {
  text?: string | number;
};

export default function InfoTag({ text }: InfoTagProps) {
  return (
    <div>
      <h3 className="text-sm uppercase border border-brand-black rounded-lg px-2 font-geistMono font-medium py-0.5">
        {text}
      </h3>
    </div>
  );
}
