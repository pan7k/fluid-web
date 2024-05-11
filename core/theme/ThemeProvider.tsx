import React, { FC, ReactNode } from "react";
import { ThemeProvider as Provider } from "styled-components";
import { Theme } from "./interfaces";

export interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  ...rest
}) => <Provider {...rest}>{children}</Provider>;
