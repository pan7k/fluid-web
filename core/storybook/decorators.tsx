import React, {
  FC,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { DialogProvider } from "../content/DialogContext";
import { LayerProvider } from "../layout/LayerContext";
import { addons } from "@storybook/preview-api";
import { DARK_MODE_EVENT_NAME } from "storybook-dark-mode";
import { StoryContext } from "storybook/internal/types";

interface AppProps {
  context: StoryContext;
  children: ReactNode;
}

export const App: FC<AppProps> = ({ context, children }) => {
  const channel = addons.getChannel();
  const [isDark, setDark] = useState(context.globals.themeVariant === "dark");

  const updateThemeClasses = () => {
    const root = document.documentElement;
    root.setAttribute("data-theme-name", context.globals.theme);

    if (isDark) {
      root.setAttribute("data-theme-variant", "dark");
    } else {
      root.removeAttribute("data-theme-variant");
    }
  };

  const handleThemeVariantChange = (darkMode: boolean) => {
    document.body.style.backgroundColor = darkMode ? "#000" : "#fff";
    setDark(darkMode);
  };

  useLayoutEffect(() => {
    updateThemeClasses();
  }, []);

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleThemeVariantChange);
    return () => channel.off(DARK_MODE_EVENT_NAME, handleThemeVariantChange);
  }, [channel]);

  useEffect(() => {
    updateThemeClasses();
  }, [context.globals.theme, isDark]);

  return (
    <LayerProvider>
      <DialogProvider>{children}</DialogProvider>
    </LayerProvider>
  );
};
