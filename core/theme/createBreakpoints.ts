import { Breakpoints, BreakpointValues } from "./interfaces/common";

export const createBreakpoints = (values: BreakpointValues): Breakpoints => {
  const keys = Object.keys(values) as (keyof BreakpointValues)[];

  const up = (key: keyof BreakpointValues): string =>
    `@media (min-width: ${values[key]}px)`;

  const down = (key: keyof BreakpointValues): string =>
    `@media (max-width: ${values[key]}px)`;

  const between = (
    start: keyof BreakpointValues,
    end: keyof BreakpointValues,
  ): string =>
    `@media (min-width: ${values[start]}px) and (max-width: ${values[end]}px)`;

  const only = (key: keyof BreakpointValues): string => {
    const endIndex = keys.indexOf(key) + 1;
    const nextValue = values[keys[endIndex]] || Infinity;
    return `@media (min-width: ${values[key]}px) and (max-width: ${nextValue - 0.02}px)`;
  };

  return { values, up, down, between, only };
};
