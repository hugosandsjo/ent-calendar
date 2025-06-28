"use client";

import React, { useRef, useState } from "react";
import RadioButton from "@/src/app/components/form/RadioButton";
import { addEntry } from "@/src/app/actions/actions";
import FormInput from "@/src/app/components/form/FormInput";
import FormInputLarge from "@/src/app/components/form/FormInputLarge";
import FormStar from "@/src/app/components/form/FormStar";
import FormMonth from "@/src/app/components/form/FormMonth";
import { ArrowLeftIcon } from "@/src/app/components/Icons";
import { Link } from "lucide-react";

export default function EntryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState<string>("Book");

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col p-1 gap-y-2 w-3/6"
      action={addEntry}
    >
      <section className="flex">
        <Link href="/dashboard" className="hover:opacity-60">
          <ArrowLeftIcon className="w-10 h-10" />
        </Link>
      </section>
      <h1 className="text-5xl mb-4">New Entry</h1>
      <div className="flex gap-2 my-2 py-2">
        {["Book", "Movie", "Series", "Game"].map((formCategory) => (
          <RadioButton
            key={formCategory}
            category={formCategory}
            onChange={handleCategoryChange}
            checked={category === formCategory}
          />
        ))}
      </div>

      <article className="flex flex-col">
        <FormInput title="Title" name="title" />
      </article>
      <article className="flex gap-4">
        <div className="flex flex-col">
          <FormMonth />
        </div>
        <div className="flex flex-col">
          <FormInput title="Year" name="year" />
        </div>
      </article>
      <article className="flex gap-4">
        <div className="flex flex-col">
          <FormInput title="Genre" name="genre" />
        </div>
      </article>
      <article className="flex gap-4 flex-wrap">
        {/* Conditionally render inputs based on category */}
        {category === "Book" && (
          <div className="flex flex-col">
            <FormInput title="Author" name="author" />
          </div>
        )}

        {(category === "Movie" || category === "Series") && (
          <>
            <div className="flex flex-col">
              <FormInput title="Director" name="director" />
            </div>
            <div className="flex flex-col">
              <FormInput title="Writer" name="writer" />
            </div>
          </>
        )}

        {category === "Game" && (
          <>
            <div className="flex flex-col">
              <FormInput title="Publisher" name="publisher" />
            </div>
            <div className="flex flex-col">
              <FormInput title="Developer" name="developer" />
            </div>
          </>
        )}
      </article>
      <FormStar />
      <FormInputLarge title="Description" name="description" />
      <button
        type="submit"
        className="mt-4 p-4 border border-black rounded-md bg-black text-white hover:opacity-60"
      >
        Submit
      </button>
    </form>
  );
}
