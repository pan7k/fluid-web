import { CSSObject } from "styled-components";

export interface Spacing {
  (factor: number): string;
}

export interface Values {
  [key: string]: number;
}

export interface Breakpoints {
  values: Values;
  up: (key: keyof Values) => string;
  down: (key: keyof Values) => string;
  between: (start: keyof Values, end: keyof Values) => string;
  only: (key: keyof Values) => string;
}

export interface Theme {
  palette: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    text: {
      primary: string;
      secondary: string;
      inverted: string;
    };
  };
  color: {
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
  };
  surface: {
    blank: string;
    10: string;
    20: string;
    30: string;
    40: string;
  };
  typography: {
    root: CSSObject;
    body: CSSObject;
    h1: CSSObject;
    h2: CSSObject;
    h3: CSSObject;
    h4: CSSObject;
    h5: CSSObject;
    h6: CSSObject;
  };
  spacing: Spacing;
  breakpoints: Breakpoints;
}
