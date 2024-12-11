import React, {
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { ThemeProvider } from "../theme/ThemeProvider";
import { DialogProvider } from "../content/DialogContext";
import { LayerProvider } from "../layout/LayerContext";
import { Theme } from "../theme/interfaces/theme";
import { defaultTheme } from "../theme/defaultTheme";
import { darkTheme } from "../theme/darkTheme";
import { themes } from "../theme/themes";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { StoryContext } from "storybook/internal/types";

interface AppProps {
  context: StoryContext;
  children: ReactNode;
}

export const App: FC<AppProps> = ({ context, children }) => {
  const channel = addons.getChannel();
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isDark, setDark] = useState(context.globals.themeVariant === "dark");

  const updateTheme = () => {
    const theme = themes.find((t) => t.code === context.globals.theme);
    setTheme(isDark ? theme?.dark || darkTheme : theme?.light || defaultTheme);
  };

  const handleThemeVariantChange = (isDark: boolean) => {
    document.body.style.backgroundColor = isDark ? "#000" : "#fff";
    setDark(isDark);
  };

  useLayoutEffect(() => {
    updateTheme();
  }, []);

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleThemeVariantChange);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleThemeVariantChange);
  }, [channel]);

  useEffect(() => {
    updateTheme();
  }, [context.globals.theme, isDark]);

  return (
    <ThemeProvider theme={theme}>
      <LayerProvider>
        <DialogProvider>{children}</DialogProvider>
      </LayerProvider>
    </ThemeProvider>
  );
};
