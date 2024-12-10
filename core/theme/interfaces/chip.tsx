import { CSSObject } from "styled-components";

interface Layer {
  first?: CSSObject;
  second?: CSSObject;
}

interface Size {
  xs?: CSSObject;
  sm?: CSSObject;
  md?: CSSObject;
  lg?: CSSObject;
}

interface Color {
  primary?: CSSObject;
  secondary?: CSSObject;
  success?: CSSObject;
  danger?: CSSObject;
  warning?: CSSObject;
  info?: CSSObject;
}

interface Variant {
  filled?: Root;
  light?: Root;
}

interface Root {
  root?: CSSObject;
  color?: Color;
}

export interface CSSChip extends Root {
  size?: Size;
  variant?: Variant;
  layer?: Layer;
}
