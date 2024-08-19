import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { EventProps } from "../common/interfaces";
import { ComponentSize } from "../common/types";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";

export type ButtonColor = "primary" | "secondary" | "success" | "danger";
export type ButtonVariant = "filled" | "outline" | "light" | "ghost";

interface CSSProps {
  root?: CSSObject;
  icon?: CSSObject;
}

export interface ButtonProps extends EventProps {
  label: string;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ComponentSize;
  sx?: CSSProps;
}

interface BaseProps {
  theme: Theme;
  $color: ButtonColor;
  $variant: ButtonVariant;
  $size: ComponentSize;
  $sx?: CSSObject;
}

interface IconProps extends Omit<BaseProps, "$color" | "$size"> {}

const Base = styled("button")<BaseProps>(
  ({ theme, $color, $variant, $size, $sx }) => ({
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
  iconVariant = "filled",
  sx,
  ...rest
}) => {
  return (
    <Base
      $color={color}
      $variant={variant}
      $size={size}
      $sx={sx?.root}
      {...rest}
    >
      {label}
      {icon && (
        <IconBase $variant={variant} $sx={sx?.icon}>
          <Icon symbol={icon} variant={iconVariant} size="xs" />
        </IconBase>
      )}
    </Base>
  );
};
