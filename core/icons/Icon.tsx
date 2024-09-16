import React, { FC } from "react";
import { ComponentSize } from "../common/types";
import { CSSObject, useTheme } from "styled-components";
import { Theme } from "../theme/interfaces/theme";

export type IconSymbol = "add" | "error" | "warning";
export type IconVariant = "filled" | "outlined";

export interface IconProps {
  symbol: IconSymbol;
  variant?: IconVariant;
  size?: ComponentSize;
  color?: string;
  sx?: CSSObject;
}

interface SVG {
  fill: string;
  variant?: IconVariant;
}

const Add: FC<SVG> = ({ fill }) => (
  <polygon
    points="18 16 18 6 16 6 16 16 6 16 6 18 16 18 16 28 18 28 18 18 28 18 28 16 18 16"
    fill={fill}
  />
);

const Error: FC<SVG> = ({ fill, variant }) => (
  <path
    d="M16,2.2C8.2,2.2,2.2,8.2,2.2,16s6,13.8,13.8,13.8S29.8,23.8,29.8,16C29.8,8.2,23.8,2.2,16,2.2z M15,8h2v11h-2V8z M16,24.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,21.5,16,21.5s1.5,0.7,1.5,1.5S16.8,24.5,16,24.5z"
    fill={fill}
  />
);

const Warning: FC<SVG> = ({ fill, variant }) => (
  <path
    d="M16.1,6.4h-0.005L4.795,28.4l0.002,0.004h22.407l0.002-0.004L16.1,6.4z M15,11h2v9h-2V11z M16,25c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22s1.5,0.7,1.5,1.5S16.8,25,16,25z"
    fill={fill}
  />
);

export const Icon: FC<IconProps> = ({
  symbol,
  variant = "filled",
  size = "md",
  color = "currentColor",
  sx,
}) => {
  const theme = useTheme() as Theme;
  const iconSize = theme.components?.icon?.size?.[size];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={iconSize}
      height={iconSize}
      viewBox="0 0 32 32"
      style={sx}
    >
      {symbol === "add" && <Add fill={color} />}
      {symbol === "error" && <Error variant={variant} fill={color} />}
      {symbol === "warning" && <Warning variant={variant} fill={color} />}
    </svg>
  );
};
