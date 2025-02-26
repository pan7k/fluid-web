import React, {
  Children,
  cloneElement,
  FC,
  HTMLAttributes,
  isValidElement,
  ReactNode,
} from "react";
import { sx } from "../theme/utils/sx";

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | ReactNode[];
  classes?: string;
}

export const Box: FC<BoxProps> = ({ children, classes }) => (
  <div className={sx("block", classes)}>
    {Children.map(children, (child, index) =>
      isValidElement(child) ? cloneElement(child, { key: index }) : child,
    )}
  </div>
);
