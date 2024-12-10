import { CSSObject } from "styled-components";

export interface CSSLayer {
  root?: CSSObject;
  level?: {
    1?: CSSObject;
    2?: CSSObject;
  };
}
