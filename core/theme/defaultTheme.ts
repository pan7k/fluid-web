import { Theme } from "./interfaces";
import { createBreakpoints } from "./createBreakpoints";
import { createSpacing } from "./createSpacing";

export const defaultTheme: Theme = {
  palette: {
    primary: "#0f62fe",
    secondary: "#6f6f6f",
    success: "#24a148",
    danger: "#da1e28",
    warning: "#f1c21b",
    info: "#0072c3",
    text: {
      primary: "#000",
      secondary: "#6f6f6f",
      inverted: "#fff",
    },
  },
  color: {
    blue: "#0072c3",
    cyan: "#009d9a",
    green: "#24a148",
    lime: "#42be65",
    yellow: "#f1c21b",
    orange: "#ff832b",
    red: "#da1e28",
    magenta: "#ff7eb6",
    violet: "#be95ff",
    purple: "#8a3ffc",
  },
  surface: {
    blank: "#fff",
    10: "#f4f",
    20: "#e0e",
    30: "#c6c",
    40: "#a8a",
  },
  typography: {
    root: {
      fontFamily: "Inter, sans-serif",
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    body: {
      fontSize: "0.875rem",
      lineHeight: "1.6",
    },
    h1: {
      fontSize: "2.25rem",
      fontWeight: 600,
      lineHeight: "1.2",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: "1.3",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: "1.35",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: "1.4",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
      lineHeight: "1.45",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.5",
    },
  },
  spacing: createSpacing(4),
  breakpoints: createBreakpoints({
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  }),
};
