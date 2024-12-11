import React from "react";
import { Preview } from "@storybook/react";
import { App } from "../core/storybook/decorators";
import { themes } from "../core/theme/themes";
import { dark, light } from "./theme";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: {
        icon: "paintbrush",
        dynamicTitle: true,
        items: themes.map((theme) => ({
          value: theme.code,
          title: theme.name,
          right: theme.description,
        })),
      },
    },
  },
  initialGlobals: {
    theme: "fluid",
    themeVariant: "light",
  },
  parameters: {
    options: {
      storySort: {
        order: ["Examples"],
      },
    },
    darkMode: {
      dark: dark,
      light: light,
    },
  },
  decorators: [
    (Story, context) => {
      return (
        <App context={context}>
          <Story />
        </App>
      );
    },
  ],
};

export default preview;
