import React, { forwardRef } from "react";
import styled, { CSSObject } from "styled-components";
import { EventProps } from "../common/interfaces";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { Theme } from "../theme/interfaces/theme";
import { Tooltip, TooltipDirection } from "../content/Tooltip";

export type IconButtonColor = "primary" | "secondary" | "success" | "danger";
export type IconButtonVariant = "filled" | "outline" | "light" | "ghost";
export type IconButtonSize = "xs" | "sm" | "md";

export interface IconButtonProps extends EventProps {
  icon: IconSymbol;
  iconVariant?: IconVariant;
  color?: IconButtonColor;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  tooltip?: string;
  direction?: TooltipDirection;
  disabled?: boolean;
  sx?: CSSObject;
}

interface BaseProps {
  theme: Theme;
  $color: IconButtonColor;
  $variant: IconButtonVariant;
  $size: IconButtonSize;
  disabled?: boolean;
  $sx?: CSSObject;
}

interface IconProps extends Omit<BaseProps, "$color" | "$size"> {}

const Base = styled.button<BaseProps>(
  ({ theme, $color, $variant, $size, disabled, $sx }) => ({
    ...theme.components?.iconButton?.root,
    ...theme.components?.button?.variant?.[$variant]?.root,
    ...theme.components?.button?.variant?.[$variant]?.color?.[$color],
    ...theme.components?.iconButton?.size?.[$size],
    ...(disabled ? { "&:disabled": theme.components?.button?.disabled } : {}),
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
      tooltip,
      direction = "bottom",
      disabled,
      sx,
      ...rest
    },
    ref,
  ) => {
    return tooltip ? (
      <Tooltip label={tooltip} direction={direction}>
        <Base
          ref={ref}
          $color={color}
          $variant={variant}
          $size={size}
          disabled={disabled}
          $sx={sx}
          {...rest}
        >
          <IconBase $variant={variant}>
            <Icon symbol={icon} variant="regular" size="xs" />
          </IconBase>
        </Base>
      </Tooltip>
    ) : (
      <Base
        ref={ref}
        $color={color}
        $variant={variant}
        $size={size}
        disabled={disabled}
        $sx={sx}
        {...rest}
      >
        <IconBase $variant={variant}>
          <Icon symbol={icon} variant="regular" size="xs" />
        </IconBase>
      </Base>
    );
  },
);
