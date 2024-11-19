import React, { useContext, ReactNode, FC } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { LayerContext } from "./LayerContext";

export interface LayerProps {
  children: ReactNode;
  sx?: CSSObject;
}

interface BaseProps {
  theme?: Theme;
  $level: number;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(({ theme, $level, $sx }) => ({
  ...theme.components?.layer?.root,
  ...(theme.components?.layer?.level &&
    $level > 0 &&
    $level < 3 &&
    theme.components.layer.level[
      $level as keyof typeof theme.components.layer.level
    ]),
  ...$sx,
}));

export const Layer: FC<LayerProps> = ({ children, sx }) => {
  const context = useContext(LayerContext);
  const current = context.level;

  let value: number;
  switch (current) {
    case 0:
      value = 1;
      break;
    case 1:
      value = 2;
      break;
    case 2:
      value = 1;
      break;
    default:
      value = 0;
  }

  return (
    <LayerContext.Provider value={{ level: value }}>
      <Base $level={value} $sx={sx}>
        {children}
      </Base>
    </LayerContext.Provider>
  );
};
