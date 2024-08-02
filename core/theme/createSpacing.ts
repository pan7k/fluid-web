import { Spacing } from "./interfaces/common";

export const createSpacing = (value: number): Spacing => {
  return (factor: number) => `${value * factor}px`;
};
