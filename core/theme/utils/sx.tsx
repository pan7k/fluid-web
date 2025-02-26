import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const sx = (...inputs: (string | object | undefined)[]) => {
  return twMerge(clsx(...inputs.filter((input) => input !== undefined)));
};
