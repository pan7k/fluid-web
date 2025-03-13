import React, { FC, HTMLAttributes, ReactNode } from "react";
import { useLayerContext } from "../layout/LayerContext";
import { sx } from "../theme/utils/sx";
import { CSS } from "../common/types";
import { Icon, IconSymbol } from "../icons/Icon";

type ChipSize = "xs" | "sm" | "md" | "lg";
export type ChipColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";
export type ChipVariant = "filled" | "light";

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
  icon?: IconSymbol;
  iconPosition?: "start" | "end";
  classes?: CSS;
}

export const Chip: FC<ChipProps> = ({
  children,
  color = "secondary",
  variant = "light",
  size = "md",
  icon,
  iconPosition = "start",
  classes,
}) => {
  const layer = useLayerContext();
  return (
    <div
      className={sx(
        `chip ${variant} ${color} ${size} ${variant === "light" ? `layer-${layer.level}` : ""}`,
        classes,
      )}
    >
      {icon && iconPosition === "start" && (
        <Icon variant="bold" symbol={icon} />
      )}
      {children}
      {icon && iconPosition === "end" && <Icon variant="bold" symbol={icon} />}
    </div>
  );
};
