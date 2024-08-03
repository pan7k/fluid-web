import React, { FC } from "react";
import { ComponentSize } from "../common/types";
import { useTheme } from "styled-components";

export type IconVariant = "add";

export interface IconProps {
  variant?: IconVariant;
  size?: ComponentSize;
  color?: string;
}

export const Icon: FC<IconProps> = ({
  variant = "add",
  size = "md",
  color = "currentColor",
}) => {
  const theme = useTheme();
  const iconSize = theme.components?.icon?.size?.[size] || 32;

  if (variant === "add") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill={color}
      >
        <polygon points="17 15 17 5 15 5 15 15 5 15 5 17 15 17 15 27 17 27 17 17 27 17 27 15 17 15" />
      </svg>
    );
  }
};
