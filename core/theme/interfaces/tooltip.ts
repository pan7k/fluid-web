import { CSSObject } from "styled-components";

interface Size {
  sm?: CSSObject;
  md?: CSSObject;
  lg?: CSSObject;
}

export interface CSSTooltip {
  root?: CSSObject;
  size?: Size;
}
