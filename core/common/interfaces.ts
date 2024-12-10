import { FocusEvent, FormEventHandler, MouseEvent } from "react";

export interface EventProps {
  onClick?: (event: MouseEvent) => void;
  onFocus?: (event: FocusEvent) => void;
}

export interface InputEventProps {
  onChange?: FormEventHandler<HTMLDivElement>;
}
