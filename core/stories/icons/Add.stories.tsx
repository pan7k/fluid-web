import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Icon } from "../../icons/Icon";

export default {
  title: "Icons/Add",
  component: Icon,
} satisfies Meta<typeof Icon>;

export const Default: StoryObj<typeof Icon> = {
  name: "Add",
  args: {
    variant: "add",
    color: "black",
    size: "xl",
  },
  parameters: parameters("<Add />", "Add icon"),
};
