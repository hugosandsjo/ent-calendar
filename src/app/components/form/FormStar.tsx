import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { UseFormSetValue, UseFormRegister } from "react-hook-form";
import { TCreateEntrySchema } from "@/src/lib/types";

type FormStarProps = {
  register: UseFormRegister<TCreateEntrySchema>;
  setValue: UseFormSetValue<TCreateEntrySchema>;
  defaultValue?: number | null;
};

export default function FormStar({
  register,
  defaultValue,
  setValue,
}: FormStarProps) {
  const [rating, setRating] = useState<number | null>(defaultValue || null);
  const [hover, setHover] = useState<number | null>(null);

  // Update rating when defaultValue changes
  useEffect(() => {
    setRating(defaultValue || null);
  }, [defaultValue]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onChange, ...registerProps } = register("rating");

  return (
    <>
      <h1>Rating</h1>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <label key={currentRating}>
              <input
                type="radio"
                value={currentRating}
                className="hidden"
                checked={rating === currentRating}
                onChange={() => {
                  setRating(currentRating);
                  setValue("rating", currentRating);
                }}
                {...registerProps}
              />
              {/* <FaStar
                size={30}
                color={
                  currentRating <= (hover ?? rating ?? 0) ? "black" : "grey"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              /> */}
              <FaStar
                size={30}
                className={
                  currentRating <= (hover ?? rating ?? 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
    </>
  );
}
