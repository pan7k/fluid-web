import { ChangeEvent, FocusEvent, MouseEvent } from "react";
import { CSSObject } from "styled-components";

export interface EventProps {
  onClick?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
}

export interface InputEventProps {
  onChange?: (event: ChangeEvent) => void;
}

export interface SxProps {
  sx?: CSSObject;
}
