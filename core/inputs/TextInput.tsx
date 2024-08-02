import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { Theme } from "../theme/interfaces";
import { ComponentSize, TextInputVariant } from "../common/types";
import { InputEventProps } from "../common/interfaces";

export interface TextInputProps extends InputEventProps {
  label: string;
  variant?: TextInputVariant;
  size?: Omit<ComponentSize, "xs" | "xl">;
  icon?: ReactNode;
}

interface BaseProps {
  theme?: Theme;
  $variant: TextInputVariant;
  $size: Omit<ComponentSize, "xs" | "xl">;
}

const Base = styled("div")<BaseProps>(({ theme, $variant, $size }) => ({
  ...theme.components?.input?.root,
  ...theme.components?.input?.variant?.[$variant]?.root,
  ...theme.components?.input?.size?.[
    $size as keyof typeof theme.components.textInput.size
  ],
}));

const Label = styled("span")<BaseProps>(({ theme, $variant }) => ({
  ...theme.components?.textInput?.variant?.[$variant]?.label,
}));

const Input = styled("input")<BaseProps>(({ theme, $variant }) => ({
  ...theme.components?.textInput?.variant?.[$variant]?.input,
}));

const HelperText = styled("span")<BaseProps>(({ theme, $variant }) => ({
  ...theme.components?.textInput?.variant?.[$variant]?.input,
}));

const Icon = styled("svg")<BaseProps>(({ theme, $variant }) => ({
  ...theme.components?.textInput?.variant?.[$variant]?.input,
}));

export const Button: FC<TextInputProps> = ({
  label,
  variant = "normal",
  size = "md",
  icon,
  ...rest
}) => {
  return (
    <>
      <Base $variant={variant} $size={size} {...rest}>
        {label}
        {icon}
      </Base>
    </>
  );
};
