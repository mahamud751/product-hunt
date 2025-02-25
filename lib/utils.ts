import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cleanName = (name: string): string => {
  if (!name) {
    return ""; // Return an empty string if the name is undefined or null
  }

  return name
    .trim() // Remove leading and trailing spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .replace(/\s/g, "-"); // Replace spaces with hyphens
};
