import { CSSObject } from "styled-components";

interface Size {
  xs?: CSSObject;
  sm?: CSSObject;
  md?: CSSObject;
}

interface Root {
  root?: CSSObject;
  icon?: CSSObject;
}

export interface CSSIconButton extends Root {
  size?: Size;
  disabled?: CSSObject;
}
