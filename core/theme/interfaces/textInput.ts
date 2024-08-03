import { CSSObject } from "styled-components";

interface Size {
  xs?: Root;
  sm?: Root;
  md?: Root;
}

interface Variant {
  normal?: Root;
  fluid?: Root;
  inline?: Root;
}

interface Root {
  root?: CSSObject;
  label?: CSSObject;
  stack?: CSSObject;
  input?: CSSObject;
  icon?: CSSObject;
  helperText?: CSSObject;
  warningText?: CSSObject;
  invalidText?: CSSObject;
}

export interface TextInput extends Root {
  variant?: Variant;
  size?: Size;
}
