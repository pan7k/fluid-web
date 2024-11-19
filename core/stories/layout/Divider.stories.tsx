import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Divider } from "../../layout/Divider";

export default {
  title: "Layout/Divider",
  component: Divider,
} satisfies Meta<typeof Divider>;

export const Default: StoryObj<typeof Divider> = {
  name: "Divider",
  args: {},
  parameters: parameters(`<Divider />`, "Divider"),
};
