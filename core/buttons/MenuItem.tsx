import React, { FC, ReactNode } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { Icon, IconSymbol } from "../icons/Icon";
import { Text } from "../typography/Text";

type MenuItemSize = "xs" | "sm" | "md" | "lg";

export interface MenuItemProps {
  label: ReactNode;
  icon?: IconSymbol;
  size?: MenuItemSize;
  color?: string;
  sx?: CSSObject;
  onClick?: (e: any) => void;
}

interface BaseProps {
  theme: Theme;
  $size: MenuItemSize;
  $color?: string;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(({ theme, $sx, $color }) => ({
  ...theme.components?.menu?.item,
  color: $color,
  ...$sx,
}));

export const MenuItem: FC<MenuItemProps> = ({
  label,
  icon,
  size = "md",
  color,
  sx,
  onClick,
}) => {
  return (
    <Base $size={size} onClick={onClick} $sx={sx}>
      {typeof label === "string" ? (
        <Text sx={color ? { color: color } : {}}>{label}</Text>
      ) : (
        label
      )}
      {icon && <Icon symbol={icon} size="xs" color={color} />}
    </Base>
  );
};
