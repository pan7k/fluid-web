import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Chip } from "../../fields/Chip";

export default {
  title: "Fields/Chip",
  component: Chip,
} satisfies Meta<typeof Chip>;

export const Default: StoryObj<typeof Chip> = {
  name: "Chip",
  args: {
    color: "secondary",
    variant: "light",
    size: "md",
    children: "Chip",
  },
  parameters: parameters(`<Chip>Chip</Chip>`, "Chip component"),
};
