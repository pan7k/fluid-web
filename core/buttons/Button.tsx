import React, { forwardRef, ReactNode } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { EventProps } from "../common/interfaces";
import { ComponentSize } from "../common/types";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";

export type ButtonColor = "primary" | "secondary" | "success" | "danger";
export type ButtonVariant = "filled" | "outline" | "light" | "ghost";

export interface ButtonProps extends EventProps {
  label: ReactNode;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  color?: ButtonColor;
  variant?: ButtonVariant;
  disabled?: boolean;
  size?: ComponentSize;
  sx?: CSSObject;
}

interface BaseProps {
  theme: Theme;
  $color: ButtonColor;
  $variant: ButtonVariant;
  $size: ComponentSize;
  $sx?: CSSObject;
}

interface IconProps extends Omit<BaseProps, "$color" | "$size"> {}

const Base = styled.button<BaseProps>(
  ({ theme, disabled, $color, $variant, $size, $sx }) => ({
    ...theme.components?.button?.root,
    ...theme.components?.button?.variant?.[$variant]?.root,
    ...theme.components?.button?.variant?.[$variant]?.color?.[$color],
    ...theme.components?.button?.size?.[$size],
    ...(disabled ? theme.components?.button?.disabled : {}),
    ...$sx,
  }),
);

const IconBase = styled.div<IconProps>(({ theme, $variant }) => ({
  svg: {
    ...theme.components?.button?.icon,
    ...theme.components?.button?.variant?.[$variant]?.icon,
  },
}));

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      color = "primary",
      variant = "filled",
      size = "md",
      disabled,
      icon,
      iconVariant = "filled",
      sx,
      ...rest
    },
    ref,
  ) => {
    return (
      <Base
        ref={ref}
        $color={color}
        $variant={variant}
        disabled={disabled}
        $size={size}
        $sx={sx}
        {...rest}
      >
        {label}
        {icon && (
          <IconBase $variant={variant}>
            <Icon symbol={icon} variant={iconVariant} size="xs" />
          </IconBase>
        )}
      </Base>
    );
  },
);
