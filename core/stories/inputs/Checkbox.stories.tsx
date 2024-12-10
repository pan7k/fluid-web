import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Checkbox } from "../../inputs/Checkbox";

export default {
  title: "Inputs/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export const Default: StoryObj<typeof Checkbox> = {
  name: "Checkbox",
  args: {
    label: "Checkbox",
    labelPosition: "right",
    defaultValue: true,
    indeterminate: false,
    disabled: false,
  },
  parameters: parameters(
    `<Checkbox label="Checkbox" defaultValue={true} />`,
    "Checkbox",
  ),
};
