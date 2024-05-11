import { Spacing } from "./interfaces";

export const createSpacing = (value: number): Spacing => {
  return (factor: number) => `${value * factor}px`;
};
