import React, { ReactNode } from "react";
import { ThemeProvider } from "../theme/ThemeProvider";
import { defaultTheme } from "../theme/defaultTheme";
import { LayerContext } from "../layout/Layer";

interface AppProps {
  children: ReactNode;
}

export const App = ({ children }: AppProps) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <LayerContext.Provider value={{ level: 0 }}>
        {children}
      </LayerContext.Provider>
    </ThemeProvider>
  );
};
