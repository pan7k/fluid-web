import React, { createContext, FC, ReactNode, useContext } from "react";

export interface LayerContextProps {
  level: number;
}

export interface LayerProviderProps {
  level?: number;
  children: ReactNode;
}

export const LayerContext = createContext<LayerContextProps>({ level: 0 });

export const useLayerContext = () => useContext(LayerContext);

export const LayerProvider: FC<LayerProviderProps> = ({
  level = 0,
  children,
}) => {
  return (
    <LayerContext.Provider value={{ level }}>{children}</LayerContext.Provider>
  );
};
