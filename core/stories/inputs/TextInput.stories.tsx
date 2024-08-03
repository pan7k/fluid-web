import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { TextInput } from "../../inputs/TextInput";

export default {
  title: "Inputs/Text Input",
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export const Default: StoryObj<typeof TextInput> = {
  name: "Text Input",
  args: {
    label: "Label",
    placeholder: "Placeholder",
    icon: "add",
    helperText: "Helper text",
    type: "text",
    variant: "normal",
    size: "sm",
  },
  parameters: parameters(`<TextInput />`, "Text input component"),
};
