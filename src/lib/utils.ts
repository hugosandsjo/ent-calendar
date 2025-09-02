import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const categoryBg: Record<string, string> = {
  Game: "bg-brand-game",
  Book: "bg-brand-book",
  Movie: "bg-brand-movie",
  Music: "bg-brand-music",
  // fallback/default style
  default: "bg-brand-gray text-black",
};
