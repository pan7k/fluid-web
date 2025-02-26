import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
} from "react";

export interface GridProps {
  children: ReactNode[];
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  justifyItems?: string;
  alignItems?: string;
  justifyContent?: string;
  alignContent?: string;
  classes?: string;
}

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
  classes,
}) => (
  <div
    className={classes}
    style={{
      display: "grid",
      gridTemplateColumns,
      gridTemplateRows,
      gap,
      rowGap,
      columnGap,
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
    }}
  >
    {Children.map(children, (child, index) =>
      isValidElement(child) ? cloneElement(child, { key: index }) : child,
    )}
  </div>
);
