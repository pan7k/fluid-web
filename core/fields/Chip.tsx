import React, { FC, HTMLAttributes, ReactNode } from "react";
import { useLayerContext } from "../layout/LayerContext";
import { sx } from "../theme/utils/sx";
import { CSS } from "../common/types";
import { Icon } from "../icons/types";

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
  icon?: Icon;
  iconPosition?: "start" | "end";
  classes?: CSS;
}

export const Chip: FC<ChipProps> = ({
  children,
  color = "secondary",
  variant = "light",
  size = "md",
  icon: IconComponent,
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
      {iconPosition === "start" && IconComponent && (
        <IconComponent weight="bold" />
      )}
      {children}
      {iconPosition === "end" && IconComponent && (
        <IconComponent weight="bold" />
      )}
    </div>
  );
};
