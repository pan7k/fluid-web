import React, { FC, ReactNode, useEffect } from "react";

export interface ThemeProviderProps {
  themeName: string;
  themeVariant?: string;
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  themeName,
  themeVariant,
  children,
}) => {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme-name", themeName);

    if (themeVariant) {
      root.setAttribute("data-theme-variant", themeVariant);
    } else {
      root.removeAttribute("data-theme-variant");
    }

    if (themeName) {
      root.setAttribute("data-theme-name", themeName);
    } else {
      root.removeAttribute("data-theme-name");
    }
  }, [themeName, themeVariant]);

  return <>{children}</>;
};
