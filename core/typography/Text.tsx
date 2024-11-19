import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";

export type TextColor = "primary" | "secondary" | "inverted";
export type TextType =
  | "body"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export interface TextProps {
  children: string;
  variant?: TextType;
  color?: TextColor;
  sx?: CSSObject;
}

interface BaseProps {
  theme: Theme;
  $variant: TextType;
  $color: TextColor;
  $sx?: CSSObject;
}

const Span = styled.span<BaseProps>(({ theme, $variant, $color, $sx }) => ({
  color: theme.palette.text[$color],
  ...theme.typography?.root,
  ...theme.typography?.[$variant],
  ...$sx,
}));

const Heading = styled.p<BaseProps>(({ theme, $variant, $color, $sx }) => ({
  color: theme.palette.text[$color],
  ...theme.typography?.root,
  ...theme.typography?.[$variant],
  ...$sx,
}));

export const Text: FC<TextProps> = ({
  variant = "body",
  color = "primary",
  children,
  sx,
}) => {
  if (variant === "body" || variant === "caption") {
    return (
      <Span $variant={variant} $color={color} $sx={sx}>
        {children}
      </Span>
    );
  } else {
    return (
      <Heading $variant={variant} $color={color} $sx={sx}>
        {children}
      </Heading>
    );
  }
};
