import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { SearchInput } from "../../inputs/SearchInput";

export default {
  title: "Inputs/Search Input",
  component: SearchInput,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof SearchInput>;

export const Default: StoryObj<typeof SearchInput> = {
  name: "Search Input",
  args: {
    placeholder: "Search",
    size: "md",
    width: 250,
    disabled: false,
    warning: false,
    invalid: false,
  },
  parameters: parameters(
    `<SearchInput placeholder="Search" />`,
    "Search input component",
  ),
};
