import React, { forwardRef } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

export interface NumberInputProps
  extends Omit<
    BaseInputProps,
    | "options"
    | "multiple"
    | "autocomplete"
    | "menuSite"
    | "chipColor"
    | "chipVariant"
  > {
  value?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    return <BaseInput type="number" ref={ref} {...props} />;
  },
);
