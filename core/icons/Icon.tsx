import React, { ElementType, FC, HTMLAttributes } from "react";
import * as Icons from "@phosphor-icons/react";
import { ComponentSize, CSS } from "../common/types";

export const iconSymbolKeys = Object.keys(Icons)
  .filter((name) => !["IconContext", "IconBase", "SSR"].includes(name))
  .map((name) => name.charAt(0).toLowerCase() + name.slice(1));
export const iconSizeKeys = ["xs", "sm", "md", "lg", "xl"];
export const iconVariantKeys = [
  "thin",
  "light",
  "regular",
  "bold",
  "fill",
  "duotone",
];

export type IconSize = ComponentSize | number;
export type IconSymbol = (typeof iconSymbolKeys)[number];
export type IconVariant =
  | "thin"
  | "light"
  | "regular"
  | "bold"
  | "fill"
  | "duotone";

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  symbol: IconSymbol;
  size?: IconSize;
  variant?: IconVariant;
  color?: string;
  cursor?: string;
}

const getSize = (size: IconSize): number => {
  const defaultSize: Record<string, number> = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 30,
    xl: 40,
  };
  return defaultSize[size] ?? defaultSize.md;
};

const camelToPascal = Object.keys(Icons).reduce<Record<string, string>>(
  (acc, key) => {
    acc[key.charAt(0).toLowerCase() + key.slice(1)] = key;
    return acc;
  },
  {},
);

export const Icon: FC<IconProps> = ({
  symbol = "asterisk",
  size = "md",
  variant = "regular",
  color = "currentColor",
  cursor,
  onClick,
}) => {
  const resolvedSize = typeof size === "number" ? size : getSize(size);
  const pascalCaseSymbol = camelToPascal[symbol];
  const SelectedIcon = pascalCaseSymbol
    ? (Icons[pascalCaseSymbol as keyof typeof Icons] as ElementType)
    : null;

  if (!SelectedIcon) {
    console.error(`Icon "${symbol}" not found in library.`);
    return null;
  }

  return (
    <SelectedIcon
      size={resolvedSize}
      weight={variant}
      color={color}
      cursor={cursor}
      onClick={onClick}
    />
  );
};
