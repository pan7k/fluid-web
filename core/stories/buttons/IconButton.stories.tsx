import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { IconButton } from "../../buttons/IconButton";

export default {
  title: "Buttons/Icon Button",
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export const Default: StoryObj<typeof IconButton> = {
  name: "IconButton",
  args: {
    color: "primary",
    variant: "filled",
    size: "md",
    icon: "add",
    iconVariant: "filled",
  },
  parameters: parameters(`<IconButton icon="add" />`, "IconButton component"),
};
