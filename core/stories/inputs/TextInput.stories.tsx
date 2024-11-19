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
    icon: "user",
    iconVariant: "outlined",
    iconPosition: "end",
    description: "Description",
    type: "text",
    variant: "normal",
    size: "md",
    width: 250,
    warning: false,
    warningText: "Warning text",
    invalid: false,
    invalidText: "Invalid text",
    disabled: false,
  },
  parameters: parameters(
    `<TextInput
  label="Label"
  icon="user"
  placeholder="Placeholder"
  description="Description"
  warningText="Warning text"
  invalidText="Invalid text"
/>`,
    "Text input",
  ),
};
