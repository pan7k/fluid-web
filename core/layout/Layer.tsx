import React, {
  useContext,
  ReactNode,
  FC,
  HTMLAttributes,
  CSSProperties,
} from "react";
import { LayerContext } from "./LayerContext";
import { sx } from "../theme/utils/sx";

export interface LayerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  classes?: string;
  style?: CSSProperties;
}

export const Layer: FC<LayerProps> = ({ children, classes, style }) => {
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
      <div className={sx(`layer layer-level-${value}`, classes)} style={style}>
        {children}
      </div>
    </LayerContext.Provider>
  );
};
