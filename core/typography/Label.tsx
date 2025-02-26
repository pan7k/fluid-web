import React, { FC, HTMLAttributes } from "react";
import { sx } from "../theme/utils/sx";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  label: string;
  htmlFor?: string;
  classes?: string;
}

export const Label: FC<LabelProps> = ({ label, htmlFor, classes }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={sx(
        `typography typography-caption typography-secondary`,
        classes,
      )}
    >
      {label}
    </label>
  );
};
