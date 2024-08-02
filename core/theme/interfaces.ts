import { R } from "@storybook/react/dist/types-bf5e6555";
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

// Component variants

interface Root {
  root?: CSSObject;
}

interface Button extends Root {
  icon?: CSSObject;
  color?: ButtonColor;
  size?: ButtonSize;
}

interface ButtonColor {
  primary?: CSSObject;
  secondary?: CSSObject;
  success?: CSSObject;
  danger?: CSSObject;
}

interface ButtonSize {
  xs?: CSSObject;
  sm?: CSSObject;
  md?: CSSObject;
  lg?: CSSObject;
  xl?: CSSObject;
}

interface ButtonVariant {
  filled?: {};
  outline?: Button;
  light?: Button;
  ghost?: Button;
}

interface Input extends Root {
  label?: CSSObject;
  input?: CSSObject;
  icon?: CSSObject;
  helperText?: CSSObject;
  invalidText?: CSSObject;
  disabled?: {
    root?: CSSObject;
    label?: CSSObject;
    input?: CSSObject;
    icon?: CSSObject;
    helperText?: CSSObject;
    invalidText?: CSSObject;
  };
}

// Theme interface

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
      icon?: CSSObject;
      color?: {
        primary?: CSSObject;
        secondary?: CSSObject;
        success?: CSSObject;
        danger?: CSSObject;
      };
      size?: {
        xs?: CSSObject;
        sm?: CSSObject;
        md?: CSSObject;
        lg?: CSSObject;
        xl?: CSSObject;
      };
      variant?: {
        filled?: {
          root?: CSSObject;
          icon?: CSSObject;
          color?: {
            primary?: CSSObject;
            secondary?: CSSObject;
            success?: CSSObject;
            danger?: CSSObject;
          };
        };
        outline?: {
          root?: CSSObject;
          icon?: CSSObject;
          color?: {
            primary?: CSSObject;
            secondary?: CSSObject;
            success?: CSSObject;
            danger?: CSSObject;
          };
        };
        light?: {
          root?: CSSObject;
          icon?: CSSObject;
          color?: {
            primary?: CSSObject;
            secondary?: CSSObject;
            success?: CSSObject;
            danger?: CSSObject;
          };
        };
        ghost?: {
          root?: CSSObject;
          icon?: CSSObject;
          color?: {
            primary?: CSSObject;
            secondary?: CSSObject;
            success?: CSSObject;
            danger?: CSSObject;
          };
        };
      };
    };
    layer?: {
      root?: CSSObject;
      level?: {
        1?: CSSObject;
        2?: CSSObject;
        3?: CSSObject;
        last?: CSSObject;
      };
    };
    input?: {
      root?: CSSObject;
      label?: CSSObject;
      input?: CSSObject;
      icon?: CSSObject;
      helperText?: CSSObject;
      invalidText?: CSSObject;
      disabled?: {
        root?: CSSObject;
        label?: CSSObject;
        input?: CSSObject;
        icon?: CSSObject;
        helperText?: CSSObject;
        invalidText?: CSSObject;
      };
      size?: {
        sm?: CSSObject;
        md?: CSSObject;
        lg?: CSSObject;
      };
      variant?: {
        normal?: {
          root?: CSSObject;
          label?: CSSObject;
          input?: CSSObject;
          icon?: CSSObject;
          helperText?: CSSObject;
          invalidText?: CSSObject;
          disabled?: {
            root?: CSSObject;
            label?: CSSObject;
            input?: CSSObject;
            icon?: CSSObject;
            helperText?: CSSObject;
            invalidText?: CSSObject;
          };
        };
        fluid?: {
          root?: CSSObject;
          label?: CSSObject;
          input?: CSSObject;
          icon?: CSSObject;
          helperText?: CSSObject;
          invalidText?: CSSObject;
          disabled?: {
            root?: CSSObject;
            label?: CSSObject;
            input?: CSSObject;
            icon?: CSSObject;
            helperText?: CSSObject;
            invalidText?: CSSObject;
          };
        };
      };
    };
  };
}
