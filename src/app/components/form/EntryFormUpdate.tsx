"use client";

import React, { useRef, useEffect, useState } from "react";
import { updateEntry, getUpdateEntry } from "@/src/app/actions/actions";
import RadioButton from "@/src/app/components/form/RadioButton";
import FormInput from "@/src/app/components/form/FormInput";
import FormInputLarge from "@/src/app/components/form/FormInputLarge";
import FormMonth from "@/src/app/components/form/FormMonth";
import { SelectEntry } from "@/src/db/schema";
import FormStar from "@/src/app/components/form/FormStar";
import { ArrowLeftIcon } from "@/src/app/components/Icons";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TCreateEntrySchema } from "@/src/lib/types";

export default function EntryFormUpdate({ id }: { id: number }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("Book");
  const [entry, setEntry] = useState<SelectEntry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TCreateEntrySchema>();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getUpdateEntry(id);
        setEntry(data);
        setSelectedCategory(data?.category || "Book");
      } catch (error) {
        console.error("Error fetching entry:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  if (isLoading || !entry) {
    return (
      <section className="flex w-screen justify-center mb-12">
        <div>Loading...</div>
      </section>
    );
  }

  const onSubmit = async (data: TCreateEntrySchema) => {
    const response = await updateEntry(id, data);

    if (!response.success) {
      console.error("Server returned validation errors:", response.message);
      return;
    }
  };

  return (
    <form
      ref={formRef}
      className="flex flex-col p-1 gap-y-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {Object.entries(errors).length > 0 && (
        <div className="text-red-500 mt-2 p-4 border border-red-300 bg-red-50 rounded">
          <p className="font-semibold mb-2">Please fix the following:</p>
          <ul className="list-disc list-inside space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field} className="text-sm">
                <strong>{field}:</strong> {error?.message || "Invalid value"}
              </li>
            ))}
          </ul>
        </div>
      )}
      <section className="flex">
        <Link href={`/dashboard/${id}`} className="hover:opacity-60">
          <ArrowLeftIcon className="w-8 h-8" />
        </Link>
      </section>
      <h1 className="text-5xl mb-4">Update Entry</h1>
      <div className="flex gap-2 my-2 py-2">
        {["Book", "Movie", "Series", "Game"].map((formCategory) => (
          <RadioButton
            key={formCategory}
            category={formCategory}
            register={register}
          />
        ))}
      </div>

      <article className="flex flex-col">
        <FormInput
          title="Title"
          name="title"
          defaultValue={entry.title}
          register={register}
        />
      </article>
      <article className="flex gap-4 flex-wrap">
        <div className="flex flex-col">
          <FormMonth defaultValue={entry.month} register={register} />
        </div>
        <div className="flex flex-col">
          <FormInput
            title="Year"
            name="year"
            defaultValue={entry.year}
            register={register}
          />
        </div>
        <article className="flex gap-4">
          <div className="flex flex-col">
            <FormInput
              title="Genre"
              name="genre"
              defaultValue={entry.genre}
              register={register}
            />
          </div>
        </article>
      </article>

      <article className="flex gap-4 flex-wrap">
        {/* Conditionally render inputs based on category */}
        {selectedCategory === "Book" && (
          <div className="flex flex-col">
            <FormInput
              title="Author"
              name="author"
              defaultValue={entry.author || ""}
              register={register}
            />
          </div>
        )}

        {(selectedCategory === "Movie" || selectedCategory === "Series") && (
          <>
            <div className="flex flex-col">
              <FormInput
                title="Director"
                name="director"
                defaultValue={entry.director || ""}
                register={register}
              />
            </div>
            <div className="flex flex-col">
              <FormInput
                title="Writer"
                name="writer"
                defaultValue={entry.writer || ""}
                register={register}
              />
            </div>
          </>
        )}

        {selectedCategory === "Game" && (
          <>
            <div className="flex flex-col">
              <FormInput
                title="Publisher"
                name="publisher"
                defaultValue={entry.publisher || ""}
                register={register}
              />
            </div>
            <div className="flex flex-col">
              <FormInput
                title="Developer"
                name="developer"
                defaultValue={entry.developer || ""}
                register={register}
              />
            </div>
          </>
        )}
      </article>
      <FormStar
        defaultValue={entry.rating}
        register={register}
        setValue={setValue}
      />
      <FormInputLarge
        title="Description"
        name="description"
        defaultValue={entry.description}
        register={register}
      />

      <button
        type="submit"
        className={`mt-4 p-4 border border-black rounded-md bg-black text-white hover:opacity-60 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        Update
      </button>
    </form>
  );
}
