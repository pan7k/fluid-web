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
    text: {
      primary: string;
      secondary: string;
      inverted: string;
    };
    primary: {
      main: string;
      10: string;
      20: string;
    };
    secondary: {
      main: string;
      10: string;
      20: string;
    };
    success: {
      main: string;
      10: string;
      20: string;
    };
    danger: {
      main: string;
      10: string;
      20: string;
    };
    warning: {
      main: string;
      10: string;
      20: string;
    };
    info: {
      main: string;
      10: string;
      20: string;
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
    focus: string;
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
  components?: {
    button?: {
      root?: CSSObject;
      variant?: {
        filled?: {
          root?: CSSObject;
          primary?: CSSObject;
          secondary?: CSSObject;
          success?: CSSObject;
          danger?: CSSObject;
        };
        outline?: {
          root?: CSSObject;
          primary?: CSSObject;
          secondary?: CSSObject;
          success?: CSSObject;
          danger?: CSSObject;
        };
        ghost?: {
          root?: CSSObject;
          primary?: CSSObject;
          secondary?: CSSObject;
          success?: CSSObject;
          danger?: CSSObject;
        };
      };
      size?: {
        xs?: CSSObject;
        sm?: CSSObject;
        md?: CSSObject;
        lg?: CSSObject;
        xl?: CSSObject;
      };
    };
  };
}
