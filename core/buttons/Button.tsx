import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { EventProps } from "../common/interfaces";
import { ComponentSize } from "../common/types";
import { Icon, IconVariant } from "../icons/Icon";
import { Add, AddLarge } from "@carbon/icons-react";

export type ButtonColor = "primary" | "secondary" | "success" | "danger";
export type ButtonVariant = "filled" | "outline" | "light" | "ghost";

export interface ButtonProps extends EventProps {
  label: string;
  icon?: IconVariant;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ComponentSize;
}

interface BaseProps {
  theme: Theme;
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

const IconBase = styled("div")<IconProps>(({ theme, $variant }) => ({
  svg: {
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
      <IconBase $variant={variant}>
        <Icon variant={icon} size="xs" />
      </IconBase>
    </Base>
  );
};
