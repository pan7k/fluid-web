import React, { FC } from "react";
import { ComponentSize } from "../common/types";
import { CSSObject, useTheme } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { isDark } from "../theme/colors";

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
    points="17 15 17 5 15 5 15 15 5 15 5 17 15 17 15 27 17 27 17 17 27 17 27 15 17 15"
    fill={fill}
  />
);

const Error: FC<SVG> = ({ fill, variant }) => {
  const inverted =
    fill === "currentColor" ? "transparent" : isDark(fill) ? "#fff" : "#000";

  return (
    <>
      <path
        d="M17.5,23.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22
        C16.8,22,17.5,22.7,17.5,23.5z M17.1,8h-2.2v11h2.2V8z"
        fill={inverted}
      />
      <path
        d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14C30,8.3,23.7,2,16,2z M14.9,8h2.2v11h-2.2V8z M16,25
        c-0.8,0-1.5-0.7-1.5-1.5S15.2,22,16,22c0.8,0,1.5,0.7,1.5,1.5S16.8,25,16,25z"
        fill={fill}
      />
    </>
  );
};

const Warning: FC<SVG> = ({ fill, variant }) => {
  const inverted =
    fill === "currentColor" ? "transparent" : isDark(fill) ? "#fff" : "#000";

  return (
    <>
      <path
        d="M16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Zm-1.125-5h2.25V12h-2.25Z"
        fill={inverted}
      />
      <path
        d="M16.002,6.1714h-.004L4.6487,27.9966,4.6506,28H27.3494l.0019-.0034ZM14.875,12h2.25v9h-2.25ZM16,26a1.5,1.5,0,1,1,1.5-1.5A1.5,1.5,0,0,1,16,26Z"
        fill={fill}
      />
      <path
        d="M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z"
        fill="none"
      />
    </>
  );
};

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
