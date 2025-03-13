import React, { FC, HTMLAttributes, ReactNode } from "react";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { Text } from "../typography/Text";
import { sx } from "../theme/utils/sx";
import { ButtonColor } from "../buttons/Button";

export type MenuItemSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  label: ReactNode;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  size?: MenuItemSize;
  color?: ButtonColor;
  classes?: string;
  disabled?: boolean;
  selected?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({
  label,
  icon,
  iconVariant,
  size = "sm",
  color = "primary",
  classes,
  disabled,
  selected,
  onClick,
  ...rest
}) => {
  return (
    <li
      className={sx(
        `menuItem ${color} ${size}`,
        classes,
        disabled ? "menuItem-disabled" : undefined,
        selected ? "menuItem-selected" : undefined,
      )}
      {...rest}
      aria-disabled={disabled}
      aria-selected={selected}
      onClick={disabled ? undefined : onClick}
    >
      {typeof label === "string" ? <Text color={color}>{label}</Text> : label}
      {icon && <Icon symbol={icon} variant={iconVariant} size="xs" />}
    </li>
  );
};
