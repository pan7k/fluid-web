import React from "react";
import { Preview } from "@storybook/react";
import { App } from "../core/storybook/decorators";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

const preview: Preview = {
  decorators: [
    (Story, context) => {
      return (
        <App theme={context.globals.theme}>
          <Story {...context.args} />
        </App>
      );
    },
  ],
  globalTypes: {
    locale: {
      description: "Locale",
      toolbar: {
        title: "Locale",
        icon: "globe",
        dynamicTitle: true,
        items: [
          { value: "en", title: "English", right: "🇬🇧" },
          { value: "sk", title: "Slovak", right: "🇸🇰" },
        ],
      },
    },
    theme: {
      description: "Theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        dynamicTitle: true,
        items: [
          {
            value: "light",
            title: "Light",
            right: "default",
          },
          {
            value: "dark",
            title: "Dark",
          },
        ],
      },
    },
  },
  initialGlobals: {
    locale: "en",
    theme: "light",
  },
  parameters: {
    options: {
      storySort: {
        order: ["Examples"],
      },
    },
  },
};

export default preview;
