import React, { FC, ReactNode } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { useLayerContext } from "../layout/LayerContext";
import { Text } from "../typography/Text";

type ChipSize = "xs" | "sm" | "md" | "lg";
type ChipColor =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";
type ChipVariant = "filled" | "light";

export interface ChipProps {
  children: ReactNode;
  color?: ChipColor;
  variant?: ChipVariant;
  size?: ChipSize;
  sx?: CSSObject;
}

interface BaseProps {
  theme: Theme;
  $color: ChipColor;
  $variant: ChipVariant;
  $layer: number;
  $size: ChipSize;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(
  ({ theme, $layer, $size, $variant, $color, $sx }) => {
    let layerStyles = {};
    if ($layer === 1) {
      layerStyles = theme.components?.chip?.layer?.first || {};
    } else if ($layer === 2) {
      layerStyles = theme.components?.chip?.layer?.second || {};
    }

    return {
      ...theme.components?.chip?.root,
      ...theme.components?.chip?.variant?.[$variant]?.root,
      ...theme.components?.chip?.variant?.[$variant]?.color?.[$color],
      ...theme.components?.chip?.size?.[$size],
      ...(($variant === "light" && layerStyles) || {}),
      ...$sx,
    };
  },
);

export const Chip: FC<ChipProps> = ({
  children,
  color = "secondary",
  variant = "light",
  size = "md",
  sx,
}) => {
  const layer = useLayerContext();
  return (
    <Base
      $layer={layer.level}
      $color={color}
      $variant={variant}
      $size={size}
      $sx={sx}
    >
      {children}
    </Base>
  );
};
