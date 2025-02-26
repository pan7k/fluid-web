import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Spinner } from "../../layout/Spinner";

const meta = {
  title: "Layout/Spinner",
  component: Spinner,
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    prominent: { control: "boolean" },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

export const Default: StoryObj<typeof Spinner> = {
  name: "Spinner",
  args: {
    size: "lg",
    prominent: true,
  },
  parameters: parameters(
    `<Spinner size="md" prominent />`,
    "Spinner component",
  ),
};
