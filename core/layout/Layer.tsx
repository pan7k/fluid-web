import React, { useContext, ReactNode, FC, createContext } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";

export interface LayerContextProps {
  level: number;
}

export const LayerContext = createContext<LayerContextProps>({ level: 0 });

export interface LayerProps {
  children: ReactNode;
  sx?: CSSObject;
}

interface BaseProps {
  theme?: Theme;
  $level: number;
  $sx?: CSSObject;
}

const Base = styled("div")<BaseProps>(({ theme, $level, $sx }) => ({
  ...theme.components?.layer?.root,
  ...(theme.components?.layer?.level && $level > 0 && $level < 3
    ? theme.components.layer.level[
        $level as keyof typeof theme.components.layer.level
      ]
    : theme.components?.layer?.level?.last),
  ...$sx,
}));

export const Layer: FC<LayerProps> = ({ children, sx }) => {
  const context = useContext(LayerContext);
  const increment = context.level + 1;

  return (
    <LayerContext.Provider value={{ level: increment }}>
      <Base $level={increment} $sx={sx}>
        {children}
      </Base>
    </LayerContext.Provider>
  );
};
