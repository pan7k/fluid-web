import React, {
  FC,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
  HTMLAttributes,
  CSSProperties,
} from "react";
import { sx } from "../theme/utils/sx";

type StackDirection = "row" | "column";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: StackDirection;
  spacing?: number;
  classes?: string;
}

export const Stack: FC<StackProps> = ({
  direction = "column",
  spacing = 4,
  children,
  classes,
}) => {
  return (
    <div
      style={{ gap: `calc(${spacing} * var(--spacing))` }}
      className={sx(
        `flex ${direction === "column" ? "flex-col" : "flex-row"}`,
        classes,
      )}
    >
      {Children.map(children, (child, index) =>
        isValidElement(child) ? cloneElement(child, { key: index }) : child,
      )}
    </div>
  );
};
