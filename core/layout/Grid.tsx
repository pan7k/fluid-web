import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
} from "react";
import styled, { CSSObject } from "styled-components";

export interface GridProps {
  children: ReactNode;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  justifyItems?: string;
  alignItems?: string;
  justifyContent?: string;
  alignContent?: string;
  sx?: CSSObject;
}

export interface BaseProps {
  $gridTemplateColumns?: string;
  $gridTemplateRows?: string;
  $gap?: number;
  $rowGap?: number;
  $columnGap?: number;
  $justifyItems?: string;
  $alignItems?: string;
  $justifyContent?: string;
  $alignContent?: string;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(
  ({
    $gridTemplateColumns,
    $gridTemplateRows,
    $gap,
    $rowGap,
    $columnGap,
    $justifyItems,
    $alignItems,
    $justifyContent,
    $alignContent,
    $sx,
  }) => ({
    display: "grid",
    gridTemplateColumns: $gridTemplateColumns,
    gridTemplateRows: $gridTemplateRows,
    gap: $gap,
    rowGap: $rowGap,
    columnGap: $columnGap,
    justifyItems: $justifyItems,
    alignItems: $alignItems,
    justifyContent: $justifyContent,
    alignContent: $alignContent,
    ...$sx,
  }),
);

export const Grid: FC<GridProps> = ({
  children,
  gridTemplateColumns,
  gridTemplateRows,
  gap,
  rowGap,
  columnGap,
  justifyItems,
  alignItems,
  justifyContent,
  alignContent,
  sx,
}) => (
  <Base
    $sx={sx}
    $gridTemplateColumns={gridTemplateColumns}
    $gridTemplateRows={gridTemplateRows}
    $gap={gap}
    $rowGap={rowGap}
    $columnGap={columnGap}
    $justifyItems={justifyItems}
    $alignItems={alignItems}
    $justifyContent={justifyContent}
    $alignContent={alignContent}
  >
    {Children.map(children, (child, index) =>
      isValidElement(child) ? cloneElement(child, { key: index }) : child,
    )}
  </Base>
);
