import { ChangeEvent, FocusEvent, MouseEvent } from "react";
import { CSSObject } from "styled-components";

export interface EventProps {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
}

export interface BaseProps extends EventProps {
  label?: string;
  sx?: CSSObject;
}

export interface InputProps extends BaseProps {
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
