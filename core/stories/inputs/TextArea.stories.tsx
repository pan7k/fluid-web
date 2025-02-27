import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { iconSymbolKeys, iconVariantKeys } from "../../icons/Icon";
import { TextArea } from "../../inputs/TextArea";

export default {
  title: "Inputs/TextArea",
  component: TextArea,
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
    variant: {
      control: { type: "radio" },
      options: ["normal", "fluid"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof TextArea>;

export const Default: StoryObj<typeof TextArea> = {
  name: "Text Area",
  args: {
    label: "Label",
    placeholder: "Placeholder",
    icon: undefined,
    iconVariant: "regular",
    iconPosition: "end",
    description: "Description",
    variant: "normal",
    size: "md",
    rows: 2,
    width: 250,
    warning: false,
    warningText: "Warning text",
    invalid: false,
    invalidText: "Invalid text",
    disabled: false,
    value: undefined,
    defaultValue: undefined,
  },
  parameters: parameters(
    `<SelectInput
  label="Label"
  icon="layers"
  placeholder="Placeholder"
  description="Description"
  warningText="Warning text"
  invalidText="Invalid text"
  options={options}
  autocomplete
  multiple
/>`,
    "Select input",
  ),
};
