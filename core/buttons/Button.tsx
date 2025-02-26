import React, {
  ButtonHTMLAttributes,
  createRef,
  forwardRef,
  ReactNode,
} from "react";
import { ComponentSize } from "../common/types";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";

export type ButtonColor =
  | "primary"
  | "secondary"
  | "info"
  | "success"
  | "warning"
  | "danger";
export type ButtonVariant = "filled" | "outline" | "light" | "ghost";
export type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  icon?: IconSymbol;
  type?: ButtonType;
  iconVariant?: IconVariant;
  color?: ButtonColor;
  variant?: ButtonVariant;
  disabled?: boolean;
  active?: boolean;
  size?: ComponentSize;
  classes?: Theme["button"];
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      icon,
      type = "button",
      iconVariant = "regular",
      color = "primary",
      variant = "filled",
      size = "md",
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

    return (
      <button
        ref={buttonRef}
        type={type}
        className={sx(
          "button",
          `button-${variant}-${color}`,
          `button-${size}`,
          {
            "button-disabled": disabled,
            [`button-${variant}-${color}-active`]: active,
          },
          classes?.button,
        )}
        disabled={disabled}
        onClick={handleClick}
        {...rest}
      >
        <label className={sx("button-label", classes?.label)}>{label}</label>
        {icon && (
          <div className={sx("button-icon", classes?.stack)}>
            <Icon symbol={icon} variant={iconVariant} size="xs" />
          </div>
        )}
      </button>
    );
  },
);
