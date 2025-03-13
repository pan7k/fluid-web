import React, { forwardRef } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

export interface TextInputProps extends BaseInputProps {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    return <BaseInput ref={ref} {...props} />;
  },
);
