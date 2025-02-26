import React, { FC } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

export interface TextInputProps extends BaseInputProps {}

export const TextInput: FC<TextInputProps> = (props) => {
  return <BaseInput {...props} />;
};
