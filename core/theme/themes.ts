import { darkTheme } from "./darkTheme";
import { defaultTheme } from "./defaultTheme";
import { Theme } from "./interfaces/theme";

export type ThemeCode = "fluid" | "custom";

export interface ThemeDefinition {
  code: ThemeCode;
  name: string;
  description?: string;
  light: Theme;
  dark?: Theme;
}

// TODO: Add custom theme
export const themes: ThemeDefinition[] = [
  {
    code: "fluid",
    name: "Fluid",
    description: "default",
    light: defaultTheme,
    dark: darkTheme,
  },
];
