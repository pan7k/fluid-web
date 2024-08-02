import { CSSObject } from "styled-components";

export interface Layer {
  root?: CSSObject;
  level?: {
    1?: CSSObject;
    2?: CSSObject;
  };
}
