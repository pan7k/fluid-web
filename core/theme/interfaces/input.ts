import { CSSObject } from "styled-components";

interface Text {
  root?: CSSObject;
  label?: CSSObject;
  helper?: CSSObject;
  warning?: CSSObject;
  invalid?: CSSObject;
}

interface Size {
  sm?: CSSObject;
  md?: CSSObject;
  lg?: CSSObject;
}

interface Variant {
  normal?: Root;
  fluid?: Root;
  inline?: Root;
}

interface Root {
  root?: CSSObject;
  text?: Text;
  input?: CSSObject;
  icon?: CSSObject;
}

export interface Input extends Root {
  variant?: Variant;
  size?: Size;
}
