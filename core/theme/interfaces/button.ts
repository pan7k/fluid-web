import { CSSObject } from "styled-components";

interface Size {
  xs?: CSSObject;
  sm?: CSSObject;
  md?: CSSObject;
  lg?: CSSObject;
  xl?: CSSObject;
}

interface Color {
  primary?: CSSObject;
  secondary?: CSSObject;
  success?: CSSObject;
  danger?: CSSObject;
}

interface Variant {
  filled?: Root;
  outline?: Root;
  light?: Root;
  ghost?: Root;
}

interface Root {
  root?: CSSObject;
  icon?: CSSObject;
  color?: Color;
  disabled?: CSSObject;
}

export interface CSSButton extends Root {
  size?: Size;
  variant?: Variant;
}
