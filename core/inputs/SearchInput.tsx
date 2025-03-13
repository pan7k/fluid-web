import React, { FC, forwardRef } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

export interface SearchInputProps
  extends Omit<
    BaseInputProps,
    | "label"
    | "variant"
    | "description"
    | "warningText"
    | "invalidText"
    | "type"
    | "icon"
    | "iconVariant"
    | "iconPosition"
  > {}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    return (
      <BaseInput
        icon="magnifying-glass"
        iconPosition="start"
        ref={ref}
        {...props}
      />
    );
  },
);
