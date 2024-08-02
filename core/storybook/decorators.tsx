import React, { ReactNode } from "react";
import { ThemeProvider } from "../theme/ThemeProvider";
import { defaultTheme } from "../theme/defaultTheme";

interface AppProps {
  children: ReactNode;
}

export const App = ({ children }: AppProps) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
