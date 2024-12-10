import { CSSObject } from "styled-components";

interface Size {
  xs?: CSSObject;
  sm?: CSSObject;
  md?: CSSObject;
}

interface Root {
  root?: CSSObject;
  panel?: CSSObject;
  icon?: CSSObject;
  content?: CSSObject;
}

export interface CSSAccordion extends Root {
  opened?: Root;
  size?: Size;
}
