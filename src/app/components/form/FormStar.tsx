import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

type FormStarProps = {
  defaultValue?: number | null;
};

export default function FormStar({ defaultValue }: FormStarProps) {
  const [rating, setRating] = useState<number | null>(defaultValue || null);
  const [hover, setHover] = useState<number | null>(null);

  // Update rating when defaultValue changes
  useEffect(() => {
    setRating(defaultValue || null);
  }, [defaultValue]);

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
                name="rating"
                value={currentRating}
                className="hidden"
                checked={rating === currentRating}
                onChange={() => setRating(currentRating)}
              />
              <FaStar
                size={30}
                color={
                  currentRating <= (hover ?? rating ?? 0) ? "black" : "grey"
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
