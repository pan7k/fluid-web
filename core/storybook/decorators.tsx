import React, { ReactNode } from "react";
import { ThemeProvider } from "../theme/ThemeProvider";
import { defaultTheme } from "../theme/defaultTheme";

export const App = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
};
