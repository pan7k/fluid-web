import { Preview } from "@storybook/react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    core: {
      disableTelemetry: true,
    },
    options: {
      storySort: {
        order: [],
      },
    },
  },
  globalTypes: {
    locale: {
      description: "Locale",
      defaultValue: "en",
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
  },
  decorators: [],
};

export default preview;
