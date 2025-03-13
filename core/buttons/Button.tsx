import React, {
  ButtonHTMLAttributes,
  createRef,
  forwardRef,
  ReactNode,
  ElementType,
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
  | "danger"
  | "debug";
export type ButtonVariant = "filled" | "outlined" | "light" | "ghost";
export type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: ReactNode | string;
  icon?: IconSymbol;
  type?: ButtonType;
  iconVariant?: IconVariant;
  color?: ButtonColor;
  variant?: ButtonVariant;
  disabled?: boolean;
  active?: boolean;
  size?: ComponentSize;
  classes?: Theme["button"];
  component?: ElementType;
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

    return (
      <Component
        ref={buttonRef}
        type={Component === "button" ? type : undefined}
        className={sx(`button ${variant} ${color} ${size}`, classes?.button)}
        active={active}
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
      </Component>
    );
  },
);
