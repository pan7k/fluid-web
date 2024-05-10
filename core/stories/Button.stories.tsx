import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../buttons/Button";

export default {
  title: "Buttons/Button",
  component: Button,
} satisfies Meta<typeof Button>;

const source = "<SkButton />";

export const Default: StoryObj<typeof Button> = {
  name: "Button",
  args: {},
  parameters: {
    docs: {
      source: {
        language: "tsx",
        code: source,
      },
    },
    storySource: {
      source,
    },
  },
};
