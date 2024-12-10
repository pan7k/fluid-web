import { CSSObject } from "styled-components";

export interface Color {
  blue: string;
  cyan: string;
  green: string;
  lime: string;
  yellow: string;
  orange: string;
  red: string;
  magenta: string;
  violet: string;
  purple: string;
}

export interface Surface {
  blank: string;
  focus: string;
  10: string;
  20: string;
  30: string;
  40: string;
}

export interface Typography {
  root: CSSObject;
  body: CSSObject;
  caption: CSSObject;
  h1: CSSObject;
  h2: CSSObject;
  h3: CSSObject;
  h4: CSSObject;
  h5: CSSObject;
  h6: CSSObject;
}

export interface Spacing {
  (factor: number): string;
}

/* Palette */

interface PaletteColor {
  dark: string;
  darker: string;
  main: string;
  lighter: string;
  light: string;
}

interface PaletteText {
  primary: string;
  secondary: string;
  inverted: string;
}

export interface Palette {
  text: PaletteText;
  primary: PaletteColor;
  secondary: PaletteColor;
  success: PaletteColor;
  danger: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
}

/* Breakpoints */

export interface BreakpointValues {
  [key: string]: number;
}

export interface Breakpoints {
  values: BreakpointValues;
  up: (key: keyof BreakpointValues) => string;
  down: (key: keyof BreakpointValues) => string;
  between: (
    start: keyof BreakpointValues,
    end: keyof BreakpointValues,
  ) => string;
  only: (key: keyof BreakpointValues) => string;
}
