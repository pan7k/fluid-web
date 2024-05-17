import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { Theme } from "../theme/interfaces";
import { EventProps } from "../common/interfaces";
import {
  ComponentColor,
  ComponentVariant,
  ComponentSize,
} from "../common/types";

export interface ButtonProps extends EventProps {
  label: string;
  color?: ComponentColor;
  variant?: ComponentVariant;
  size?: ComponentSize;
  icon?: ReactNode;
}

interface BaseProps {
  theme?: Theme;
  $color: ComponentColor;
  $variant: ComponentVariant;
  $size: ComponentSize;
}

const Base = styled("button")<BaseProps>(
  ({ theme, $color, $variant, $size }) => ({
    ...theme.components?.button?.root,
    ...theme.components?.button?.variant?.[$variant]?.root,
    ...theme.components?.button?.variant?.[$variant]?.[$color],
    ...theme.components?.button?.size?.[$size],
  }),
);

export const Button: FC<ButtonProps> = ({
  label,
  color = "primary",
  variant = "filled",
  size = "md",
  icon,
  ...rest
}) => {
  return (
    <Base $color={color} $variant={variant} $size={size} {...rest}>
      {label}
      {icon}
    </Base>
  );
};
