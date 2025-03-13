import React, { ButtonHTMLAttributes, createRef, forwardRef } from "react";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { Tooltip, TooltipDirection, TooltipSize } from "../content/Tooltip";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";
import { ButtonType } from "./Button";
import { ComponentSize } from "../common/types";

export type IconButtonColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "debug";
export type IconButtonVariant = "filled" | "outlined" | "light" | "ghost";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconSymbol;
  iconVariant?: IconVariant;
  type?: ButtonType;
  color?: IconButtonColor;
  variant?: IconButtonVariant;
  size?: ComponentSize;
  tooltip?: string;
  tooltipSize?: TooltipSize;
  direction?: TooltipDirection;
  disabled?: boolean;
  active?: boolean;
  classes?: Theme["iconButton"];
  component?: React.ElementType;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      color = "primary",
      variant = "filled",
      size = "md",
      icon,
      iconVariant = "regular",
      tooltip,
      tooltipSize = "md",
      direction = "bottom",
      disabled,
      active,
      classes,
      onClick,
      component: Component = "button",
      ...rest
    },
    ref,
  ) => {
    const buttonRef = ref || createRef<HTMLButtonElement>();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(event);
      }
      if ("current" in buttonRef && buttonRef.current) {
        buttonRef.current.focus();
      }
    };
    const buttonClassName = sx(
      `iconButton ${variant} ${color} ${size}`,
      classes?.button,
    );

    return tooltip ? (
      <Tooltip
        label={tooltip}
        direction={direction}
        classes={{ container: classes?.tooltip }}
        size={tooltipSize}
      >
        <Component
          ref={buttonRef}
          className={buttonClassName}
          disabled={disabled}
          active={active}
          onClick={handleClick}
          {...rest}
        >
          <div className={sx("iconButton-icon", classes?.stack)}>
            <Icon
              symbol={icon}
              variant={iconVariant}
              size={size === "lg" ? "sm" : size === "xl" ? "md" : "xs"}
            />
          </div>
        </Component>
      </Tooltip>
    ) : (
      <Component
        ref={buttonRef}
        className={buttonClassName}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        <div className={sx("iconButton-icon", classes?.stack)}>
          <Icon
            symbol={icon}
            variant={iconVariant}
            size={size === "lg" ? "sm" : size === "xl" ? "md" : "xs"}
          />
        </div>
      </Component>
    );
  },
);
