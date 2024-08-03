import React, { useContext, ReactNode, FC, createContext } from "react";
import styled from "styled-components";
import { Theme } from "../theme/interfaces/theme";

export interface LayerContextProps {
  level: number;
}

export const LayerContext = createContext<LayerContextProps>({ level: 0 });

export interface LayerProps {
  level?: number;
  children: ReactNode;
}

interface BaseProps {
  theme?: Theme;
  $level: number;
}

const Base = styled("div")<BaseProps>(({ theme, $level }) => ({
  ...theme.components?.layer?.root,
  ...(theme.components?.layer?.level && $level > 0 && $level < 3
    ? theme.components.layer.level[
        $level as keyof typeof theme.components.layer.level
      ]
    : theme.components?.layer?.level?.last),
}));

export const Layer: FC<LayerProps> = ({ children }) => {
  const context = useContext(LayerContext);
  const increment = context.level + 1;

  return (
    <LayerContext.Provider value={{ level: increment }}>
      <Base $level={increment}>{children}</Base>
    </LayerContext.Provider>
  );
};
