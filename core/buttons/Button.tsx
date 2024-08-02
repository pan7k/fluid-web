import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { EventProps } from "../common/interfaces";
import { ButtonColor, ButtonVariant, ComponentSize } from "../common/types";

export interface ButtonProps extends EventProps {
  label: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ComponentSize;
  icon?: ReactNode;
}

interface BaseProps {
  theme?: Theme;
  $color: ButtonColor;
  $variant: ButtonVariant;
  $size: ComponentSize;
}

interface IconProps extends Omit<BaseProps, "$color" | "$size"> {}

const Base = styled("button")<BaseProps>(
  ({ theme, $color, $variant, $size }) => ({
    ...theme.components?.button?.root,
    ...theme.components?.button?.variant?.[$variant]?.root,
    ...theme.components?.button?.variant?.[$variant]?.color?.[$color],
    ...theme.components?.button?.size?.[$size],
  }),
);

const Icon = styled("div")<IconProps>(({ theme, $variant }) => ({
  "& svg": {
    ...theme.components?.button?.icon,
    ...theme.components?.button?.variant?.[$variant]?.icon,
  },
}));

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
      <Icon $variant={variant}>{icon}</Icon>
    </Base>
  );
};
