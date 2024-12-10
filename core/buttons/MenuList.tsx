import React, { ReactElement, CSSProperties, forwardRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Theme } from "../theme/interfaces/theme";

export interface MenuListProps {
  children?: ReactElement;
  width?: number;
  minWidth?: number;
  onClick?: () => void;
  style?: CSSProperties;
  position?: { top: number; left: number };
}

interface BaseProps {
  theme: Theme;
  $position: { top: number; left: number };
  $width?: number;
  $minWidth?: number;
}

const Base = styled.div<BaseProps>(
  ({ theme, $position, $width, $minWidth }) => ({
    ...theme.components?.menu?.list,
    top: $position.top,
    left: $position.left,
    width: $width ? `${$width}px` : "auto",
    minWidth: $minWidth ? `${$minWidth}px` : "auto",
  }),
);

export const MenuList = forwardRef<HTMLDivElement, MenuListProps>(
  (
    {
      children,
      width,
      minWidth,
      onClick,
      style,
      position = { top: 0, left: 0 },
    },
    ref,
  ) => {
    const menuListElement = (
      <Base
        ref={ref}
        $width={width}
        $minWidth={minWidth}
        onClick={onClick}
        style={style}
        $position={position}
      >
        {children}
      </Base>
    );

    return createPortal(menuListElement, document.body);
  },
);
