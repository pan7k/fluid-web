import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
} from "react";
import styled, { CSSObject } from "styled-components";

type StackDirection = "row" | "column";

export interface StackProps {
  children: ReactNode;
  direction?: StackDirection;
  spacing?: number;
  sx?: CSSObject;
}

export interface BaseProps {
  $direction: StackDirection;
  $spacing: number;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(({ theme, $direction, $spacing, $sx }) => ({
  display: "flex",
  flexDirection: $direction,
  gap: theme.spacing($spacing),
  rowGap: $direction === "column" ? theme.spacing($spacing) : undefined,
  columnGap: $direction === "row" ? theme.spacing($spacing) : undefined,
  ...$sx,
}));

export const Stack: FC<StackProps> = ({
  direction = "column",
  spacing = 4,
  children,
  sx,
}) => (
  <Base $direction={direction} $spacing={spacing} $sx={sx}>
    {Children.map(children, (child, index) =>
      isValidElement(child) ? cloneElement(child, { key: index }) : child,
    )}
  </Base>
);
