import React, { FC, MenuHTMLAttributes, ReactNode } from "react";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { Text } from "../typography/Text";
import { sx } from "../theme/utils/sx";
import { ButtonColor } from "../buttons/Button";

export type MenuItemSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface MenuItemProps extends MenuHTMLAttributes<HTMLMenuElement> {
  label: ReactNode;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  size?: MenuItemSize;
  color?: ButtonColor;
  classes?: string;
}

export const MenuItem: FC<MenuItemProps> = ({
  label,
  icon,
  iconVariant,
  size = "sm",
  color = "primary",
  classes,
  ...rest
}) => {
  return (
    <menu
      className={sx(`menuItem menuItem-${color} menuItem-${size}`, classes)}
      {...rest}
    >
      {typeof label === "string" ? <Text color={color}>{label}</Text> : label}
      {icon && <Icon symbol={icon} variant={iconVariant} size="xs" />}
    </menu>
  );
};
