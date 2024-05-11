import { Breakpoints, Values } from "./interfaces";

export const createBreakpoints = (values: Values): Breakpoints => {
  const keys = Object.keys(values) as (keyof Values)[];
  const up = (key: keyof Values): string =>
    `@media (min-width: ${values[key]}px)`;
  const down = (key: keyof Values): string =>
    `@media (max-width: ${values[key]}px)`;
  const between = (start: keyof Values, end: keyof Values): string =>
    `@media (min-width: ${values[start]}px) and (max-width: ${values[end]}px)`;
  const only = (key: keyof Values): string => {
    const endIndex = keys.indexOf(key) + 1;
    const nextValue = values[keys[endIndex]] || Infinity;
    return `@media (min-width: ${values[key]}px) and (max-width: ${nextValue - 0.02}px)`;
  };

  return { values, up, down, between, only };
};
