import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { iconVariantKeys } from "../../icons/Icon";
import { BaseInput } from "../../inputs/BaseInput";

export default {
  title: "Inputs/Base Input",
  component: BaseInput,
  argTypes: {
    icon: {
      control: { type: "select" },
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
} satisfies Meta<typeof BaseInput>;

export const Default: StoryObj<typeof BaseInput> = {
  name: "Base Input",
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
