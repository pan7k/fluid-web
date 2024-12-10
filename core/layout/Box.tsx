import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
} from "react";
import styled, { CSSObject } from "styled-components";

export interface BoxProps {
  children: ReactNode;
  sx?: CSSObject;
}

export interface BaseProps {
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(({ $sx }) => ({
  display: "block",
  ...$sx,
}));

export const Box: FC<BoxProps> = ({ children, sx }) => (
  <Base $sx={sx}>
    {Children.map(children, (child, index) =>
      isValidElement(child) ? cloneElement(child, { key: index }) : child,
    )}
  </Base>
);
