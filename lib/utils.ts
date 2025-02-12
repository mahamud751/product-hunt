import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cleanName = (name: string): string => {
  // Trim extra spaces and replace multiple spaces with a single hyphen
  return name
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .replace(/\s/g, "-"); // Replace spaces with hyphens
};

//// tagLine headline

//image size large 1 min
//category
//discord cancel
//linekdin add
//tag
//alternative
//video link optional
//price
//promo code optional
//comment
