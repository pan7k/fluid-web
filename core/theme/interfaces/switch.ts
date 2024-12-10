import { CSSObject } from "styled-components";

interface Root {
  root?: CSSObject;
  stack?: CSSObject;
  knob?: CSSObject;
  input?: CSSObject;
}

export interface CSSSwitch extends Root {
  checked?: Root;
  disabled?: Root;
}
