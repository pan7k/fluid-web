import React, { FC, ReactNode } from "react";
import { useLayerContext } from "../layout/LayerContext";
import { sx } from "../theme/utils/sx";
import { CSS } from "../common/types";

type ChipSize = "xs" | "sm" | "md" | "lg";
export type ChipColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";
export type ChipVariant = "filled" | "light";

export interface ChipProps {
  children: ReactNode;
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
  classes?: CSS;
}

export const Chip: FC<ChipProps> = ({
  children,
  color = "secondary",
  variant = "light",
  size = "md",
  classes,
}) => {
  const layer = useLayerContext();
  return (
    <div
      className={sx(
        `chip chip-${variant}-${color} chip-${size} ${variant === "light" ? `chip-layer-${layer.level}` : ""}`,
        classes,
      )}
    >
      {children}
    </div>
  );
};
