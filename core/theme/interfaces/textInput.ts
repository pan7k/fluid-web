import { CSSObject } from "styled-components";

interface Size {
  xs?: Root;
  sm?: Root;
  md?: Root;
  lg?: Root;
}

interface Variant {
  normal?: Root;
  fluid?: Root;
  inline?: Root;
}

interface State {
  disabled?: Root;
  warning?: Root;
  invalid?: Root;
}

interface Icon {
  root?: CSSObject;
  adornment?: CSSObject;
  warning?: CSSObject;
  invalid?: CSSObject;
}

interface Text {
  root?: CSSObject;
  label?: CSSObject;
  description?: CSSObject;
  warning?: CSSObject;
  invalid?: CSSObject;
}

interface Root {
  root?: CSSObject;
  stack?: CSSObject;
  input?: CSSObject;
  icon?: Icon;
  text?: Text;
  state?: State;
  size?: Size;
}

export interface TextInput extends Root {
  variant?: Variant;
}
