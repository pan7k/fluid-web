import { ChangeEvent, FocusEvent, MouseEvent } from "react";
import { CSSObject } from "styled-components";

export interface EventProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
}

export interface InputEventProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SxProps {
  sx?: CSSObject;
}
