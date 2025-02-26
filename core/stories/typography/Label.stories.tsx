import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Label } from "../../typography/Label";

export default {
  title: "Typography/Label",
  component: Label,
} satisfies Meta<typeof Label>;

export const Default: StoryObj<typeof Label> = {
  name: "Label",
  args: {
    label: "Lorem ipsum dolor sit amet",
    classes: "",
  },
  parameters: parameters(
    `<Label>Lorem ipsum dolor sit amet</Label>`,
    "Label component",
  ),
};
