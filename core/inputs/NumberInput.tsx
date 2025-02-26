import React, { FC } from "react";
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

export const NumberInput: FC<NumberInputProps> = (props) => {
  return <BaseInput type="number" {...props} />;
};
