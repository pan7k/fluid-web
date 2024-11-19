import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Text } from "../../typography/Text";

export default {
  title: "Typography/Text",
  component: Text,
} satisfies Meta<typeof Text>;

export const Default: StoryObj<typeof Text> = {
  name: "Text",
  args: {
    variant: "body",
    color: "primary",
    children: "Lorem ipsum dolor sit amet",
  },
  parameters: parameters(
    `<Text>Lorem ipsum dolor sit amet</Text>`,
    "Text component",
  ),
};
