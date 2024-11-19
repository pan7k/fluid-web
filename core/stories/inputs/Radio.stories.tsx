import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Radio } from "../../inputs/Radio";

export default {
  title: "Inputs/Radio",
  component: Radio,
} satisfies Meta<typeof Radio>;

export const Default: StoryObj<typeof Radio> = {
  name: "Radio",
  args: {
    label: "Radio",
    defaultValue: "3",
    disabled: false,
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
      { label: "Option 4", value: "4" },
    ],
  },
  parameters: parameters(
    `<Radio label="Radio" defaultValue={true} />`,
    "Radio",
  ),
};
