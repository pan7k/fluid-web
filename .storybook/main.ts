import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-toolbars",
    "storybook-dark-mode",
    "@storybook/addon-controls",
    "@storybook/addon-storysource",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
    "@storybook/addon-highlight",
    "@storybook/addon-links",
    "@storybook/addon-measure",
    "@storybook/addon-outline",
    "@storybook/addon-themes",
    "@storybook/addon-viewport",
    "@storybook/addon-a11y",
  ],
  core: {
    disableWhatsNewNotifications: true,
    disableTelemetry: true,
  },
  docs: {
    autodocs: "tag",
    defaultName: "Overview",
  },
  framework: "@storybook/react-webpack5",
  staticDirs: ["../public"],
  stories: ["../core/stories/**/*.mdx", "../core/stories/**/*.stories.tsx"],
};

export default config;
