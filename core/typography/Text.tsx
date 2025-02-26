import React, { FC, HTMLAttributes } from "react";
import { sx } from "../theme/utils/sx";

export type TextColor =
  | "primary"
  | "secondary"
  | "inverted"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type TextType =
  | "body"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface TextProps
  extends HTMLAttributes<HTMLParagraphElement | HTMLSpanElement> {
  children: string;
  variant?: TextType;
  color?: TextColor;
  classes?: string;
}

export const Text: FC<TextProps> = ({
  variant = "body",
  color = "primary",
  children,
  classes,
}) => {
  if (variant === "body" || variant === "caption") {
    return (
      <span
        className={sx(
          `typography typography-${variant} typography-${color}`,
          classes,
        )}
      >
        {children}
      </span>
    );
  } else {
    return (
      <p
        className={sx(
          `typography typography-${variant} typography-${color}`,
          classes,
        )}
      >
        {children}
      </p>
    );
  }
};
