"use client";

import React, { useRef, useEffect, useState } from "react";
import { updateEntry, getUpdateEntry } from "@/src/app/actions/actions";
import RadioButton from "@/src/app/components/form/RadioButton";
import FormInput from "@/src/app/components/form/FormInput";
import FormInputLarge from "@/src/app/components/form/FormInputLarge";
import FormMonth from "@/src/app/components/form/FormMonth";
import { InsertEntry } from "@/src/db/schema";
import FormStar from "@/src/app/components/form/FormStar";

export default function EntryFormUpdate({ id }: { id: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState<string>("Book");
  const [entry, setEntry] = useState<InsertEntry>({
    id: 0,
    title: "",
    genre: "",
    year: 0,
    category: "Book",
    month: "",
    author: "",
    director: "",
    writer: "",
    publisher: "",
    developer: "",
    description: "",
    rating: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: "",
  });

  useEffect(() => {
    (async () => {
      const data: InsertEntry = await getUpdateEntry(id);
      setEntry({
        id: data.id,
        title: data.title,
        genre: data.genre,
        year: data.year,
        category: data.category,
        month: data.month,
        author: data.author ?? "",
        director: data.director ?? "",
        writer: data.writer ?? "",
        publisher: data.publisher ?? "",
        developer: data.developer ?? "",
        description: data.description ?? "",
        rating: data.rating ?? null,
        createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
        updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
        user_id: data.user_id ?? "",
      });
      setCategory(data?.category || "Book");
    })();
  }, [id]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.defaultValue);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(formRef.current!);

    try {
      await updateEntry(id, formData);
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <section className="flex w-screen justify-center mb-12">
      <h1>Id: {id}</h1>
      <form
        ref={formRef}
        className="flex flex-col p-1 gap-y-2 w-3/6"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-5xl mb-4">Update Entry</h1>
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
        <div className="flex flex-col">
          <FormInput title="Title" name="title" defaultValue={entry.title} />
        </div>
        <article className="flex gap-4">
          <div className="flex flex-col">
            <FormMonth defaultValue={entry.month} />
          </div>
          <div className="flex flex-col">
            <FormInput title="Year" name="year" defaultValue={entry.year} />
          </div>
        </article>
        <article className="flex gap-4">
          <div className="flex flex-col">
            <FormInput title="Genre" name="genre" defaultValue={entry.genre} />
          </div>
        </article>
        <article className="flex gap-4 flex-wrap">
          {/* Conditionally render inputs based on category */}
          {category === "Book" && (
            <div className="flex flex-col">
              <FormInput
                title="Author"
                name="author"
                defaultValue={entry.author || ""}
              />
            </div>
          )}

          {(category === "Movie" || category === "Series") && (
            <>
              <div className="flex flex-col">
                <FormInput
                  title="Director"
                  name="director"
                  defaultValue={entry.director || ""} // Ensure director is defined
                />
              </div>
              <div className="flex flex-col">
                <FormInput
                  title="Writer"
                  name="writer"
                  defaultValue={entry.writer || ""} // Ensure writer is defined
                />
              </div>
            </>
          )}

          {category === "Game" && (
            <>
              <div className="flex flex-col">
                <FormInput
                  title="Publisher"
                  name="publisher"
                  defaultValue={entry.publisher || ""} // Ensure publisher is defined
                />
              </div>
              <div className="flex flex-col">
                <FormInput
                  title="Developer"
                  name="developer"
                  defaultValue={entry.developer || ""} // Ensure developer is defined
                />
              </div>
            </>
          )}
        </article>
        <FormStar />
        <FormInputLarge
          title="Description"
          name="description"
          defaultValue={entry?.description}
        />

        <button
          type="submit"
          className="mt-4 p-4 border border-black rounded-md bg-black text-white hover:opacity-60"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
