import { CSSObject } from "styled-components";

interface Header {
  root?: CSSObject;
  label?: CSSObject;
  buttons?: CSSObject;
}

interface Root {
  root?: CSSObject;
  content?: CSSObject;
  actions?: CSSObject;
  overlay?: CSSObject;
  panel?: CSSObject;
}

export interface CSSDialog extends Root {
  header?: Header;
}
