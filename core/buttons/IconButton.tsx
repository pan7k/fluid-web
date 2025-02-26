import React, { ButtonHTMLAttributes, createRef, forwardRef } from "react";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { Tooltip, TooltipDirection } from "../content/Tooltip";
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
  | "danger";
export type IconButtonVariant = "filled" | "outline" | "light" | "ghost";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconSymbol;
  iconVariant?: IconVariant;
  type?: ButtonType;
  color?: IconButtonColor;
  variant?: IconButtonVariant;
  size?: ComponentSize;
  tooltip?: string;
  direction?: TooltipDirection;
  disabled?: boolean;
  active?: boolean;
  classes?: Theme["iconButton"];
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
      direction = "bottom",
      disabled,
      active,
      classes,
      onClick,
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
      "iconButton",
      `iconButton-${variant}-${color}`,
      `iconButton-${size}`,
      {
        "iconButton-disabled": disabled,
        [`iconButton-${variant}-${color}-active`]: active,
      },
      classes?.button,
    );

    return tooltip ? (
      <Tooltip
        label={tooltip}
        direction={direction}
        classes={{ container: classes?.tooltip }}
      >
        <button
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
        </button>
      </Tooltip>
    ) : (
      <button
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
      </button>
    );
  },
);
