import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
