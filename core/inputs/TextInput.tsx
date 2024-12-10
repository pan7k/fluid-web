import React, { FC } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

export interface TextInputProps
  extends Omit<BaseInputProps, "options" | "multiple" | "autocomplete"> {}

export const TextInput: FC<TextInputProps> = (props) => {
  return <BaseInput {...props} />;
};
