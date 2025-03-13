import React, { FC, HTMLAttributes, ElementType, ReactNode } from "react";
import { sx } from "../theme/utils/sx";

export type TextColor =
  | "primary"
  | "secondary"
  | "inverted"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "debug";
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
  children: string | number | ReactNode;
  variant?: TextType;
  color?: TextColor;
  classes?: string;
  component?: ElementType;
}

export const Text: FC<TextProps> = ({
  variant = "body",
  color = "primary",
  children,
  classes,
  component,
  ...rest
}) => {
  const Component =
    component ||
    (variant === "body" || variant === "caption" ? "span" : variant);

  return (
    <Component
      className={sx(
        `typography typography-${variant} typography-${color}`,
        classes,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
