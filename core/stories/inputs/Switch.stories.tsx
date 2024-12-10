import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Switch } from "../../inputs/Switch";

export default {
  title: "Inputs/Switch",
  component: Switch,
} satisfies Meta<typeof Switch>;

export const Default: StoryObj<typeof Switch> = {
  name: "Switch",
  args: {
    label: "",
    defaultValue: true,
    disabled: false,
    labelPosition: "right",
  },
  parameters: parameters(`<Switch defaultValue={true} />`, "Switch"),
};
