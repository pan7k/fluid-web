import React, { FC } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

export interface SelectInputProps extends Omit<BaseInputProps, "type"> {}

export const SelectInput: FC<SelectInputProps> = (props) => {
  return <BaseInput type="text" {...props} />;
};
