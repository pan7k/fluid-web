import React, { FC, forwardRef } from "react";
import styled, { CSSObject } from "styled-components";
import { EventProps } from "../common/interfaces";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { Theme } from "../theme/interfaces/theme";

export type IconButtonColor = "primary" | "secondary" | "success" | "danger";
export type IconButtonVariant = "filled" | "outline" | "light" | "ghost";
export type IconButtonSize = "xs" | "sm" | "md";

export interface IconButtonProps extends EventProps {
  icon: IconSymbol;
  iconVariant?: IconVariant;
  color?: IconButtonColor;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  sx?: CSSObject;
}

interface BaseProps {
  theme: Theme;
  $color: IconButtonColor;
  $variant: IconButtonVariant;
  $size: IconButtonSize;
  $sx?: CSSObject;
}

interface IconProps extends Omit<BaseProps, "$color" | "$size"> {}

const Base = styled.button<BaseProps>(
  ({ theme, $color, $variant, $size, $sx }) => ({
    ...theme.components?.iconButton?.root,
    ...theme.components?.button?.variant?.[$variant]?.root,
    ...theme.components?.button?.variant?.[$variant]?.color?.[$color],
    ...theme.components?.iconButton?.size?.[$size],
    ...$sx,
  }),
);

const IconBase = styled.div<IconProps>(({ theme, $variant }) => ({
  svg: {
    ...theme.components?.iconButton?.icon,
    ...theme.components?.button?.variant?.[$variant]?.icon,
  },
}));

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      color = "primary",
      variant = "filled",
      size = "md",
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
        $size={size}
        $sx={sx}
        {...rest}
      >
        <IconBase $variant={variant}>
          <Icon symbol={icon} variant={iconVariant} size="xs" />
        </IconBase>
      </Base>
    );
  },
);
