import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Icon } from "../../icons/Icon";

export default {
  title: "Icons/Icon",
  component: Icon,
} satisfies Meta<typeof Icon>;

export const Default: StoryObj<typeof Icon> = {
  name: "Icon",
  args: {
    symbol: "add",
    color: "black",
    size: "xl",
  },
  parameters: parameters(`<Icon variant="add" size="xl" />`, "Icon component"),
};
