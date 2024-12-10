import React, { FC } from "react";
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

export const SearchInput: FC<SearchInputProps> = (props) => {
  return <BaseInput icon="magnifyingGlass" iconPosition="start" {...props} />;
};
