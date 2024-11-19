import React, { ReactNode, useEffect } from "react";
import { ThemeProvider } from "../theme/ThemeProvider";
import { defaultTheme } from "../theme/defaultTheme";
import { DialogProvider } from "../content/DialogContext";
import { LayerProvider } from "../layout/LayerContext";
import { darkTheme } from "../theme/darkTheme";

export type ThemeVariant = "light" | "dark";

interface AppProps {
  children: ReactNode;
  theme?: ThemeVariant;
}

export const App = ({ children, theme }: AppProps) => {
  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "#fff" : "#000";
  }, [theme]);

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : defaultTheme}>
      <LayerProvider>
        <DialogProvider>{children}</DialogProvider>
      </LayerProvider>
    </ThemeProvider>
  );
};
