import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { TextInput } from "../../inputs/TextInput";
import { iconSymbolKeys, iconVariantKeys } from "../../icons/Icon";

export default {
  title: "Inputs/Text Input",
  component: TextInput,
  argTypes: {
    icon: {
      control: { type: "select" },
      options: iconSymbolKeys,
    },
    iconVariant: {
      control: { type: "select" },
      options: iconVariantKeys,
    },
    iconPosition: {
      control: { type: "radio" },
      options: ["start", "end"],
    },
    type: {
      control: { type: "select" },
      options: ["email", "text", "url", "password"],
    },
    variant: {
      control: { type: "radio" },
      options: ["normal", "fluid"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof TextInput>;

export const Default: StoryObj<typeof TextInput> = {
  name: "Text Input",
  args: {
    label: "Label",
    placeholder: "Placeholder",
    icon: "user",
    iconVariant: "regular",
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
