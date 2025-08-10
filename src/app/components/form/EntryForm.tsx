"use client";

import React, { useRef } from "react";
import RadioButton from "@/src/app/components/form/RadioButton";
import { addEntry } from "@/src/app/actions/actions";
import FormInput from "@/src/app/components/form/FormInput";
import FormInputLarge from "@/src/app/components/form/FormInputLarge";
import FormStar from "@/src/app/components/form/FormStar";
import FormMonth from "@/src/app/components/form/FormMonth";
import { ArrowLeftIcon } from "@/src/app/components/Icons";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEntrySchema, TCreateEntrySchema } from "@/src/lib/types";

export default function EntryForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TCreateEntrySchema>({
    resolver: zodResolver(createEntrySchema),
    defaultValues: {
      category: "Book",
    },
  });

  const selectedCategory = watch("category");

  const onSubmit = async (data: TCreateEntrySchema) => {
    const response = await addEntry(data);

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
      <div className="flex justify-between">
        <Link href="/dashboard" className="hover:opacity-60">
          <ArrowLeftIcon className="w-12 h-12" />
        </Link>

        <h1 className="text-5xl mb-4">New Entry</h1>
        <div></div>
      </div>
      <div className="flex gap-2 my-2 py-2">
        {["Book", "Movie", "Series", "Game"].map((formCategory) => (
          <RadioButton
            key={formCategory}
            category={formCategory}
            register={register}
          />
        ))}
      </div>
      <FormInput title="Title" name="title" register={register} />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
      <article className="flex gap-4 flex-wrap">
        <FormMonth register={register} />
        <FormInput title="Year" name="year" register={register} />
        {errors.year && (
          <p className="text-red-500 text-sm">{errors.year.message}</p>
        )}
        <article className="flex gap-4">
          <FormInput title="Genre" name="genre" register={register} />
        </article>
        {errors.genre && (
          <p className="text-red-500 text-sm">{errors.genre.message}</p>
        )}
      </article>

      <article className="flex gap-4 flex-wrap">
        {/* Conditionally render inputs based on category */}
        {selectedCategory === "Book" && (
          <FormInput title="Author" name="author" register={register} />
        )}

        {(selectedCategory === "Movie" || selectedCategory === "Series") && (
          <>
            <FormInput title="Director" name="director" register={register} />
            <FormInput title="Writer" name="writer" register={register} />
          </>
        )}

        {selectedCategory === "Game" && (
          <>
            <FormInput title="Publisher" name="publisher" register={register} />
            <FormInput title="Developer" name="developer" register={register} />
          </>
        )}
      </article>
      <FormStar setValue={setValue} register={register} />
      {errors.rating && (
        <p className="text-red-500 text-sm">{errors.rating.message}</p>
      )}
      <FormInputLarge
        title="Description"
        name="description"
        register={register}
      />
      <button
        type="submit"
        className={`mt-4 p-4 border border-black rounded-md bg-black text-white hover:opacity-60 ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        Create
      </button>
    </form>
  );
}
