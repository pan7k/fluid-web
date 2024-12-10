import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { SelectInput } from "../../inputs/SelectInput";
import { iconSymbolKeys, iconVariantKeys } from "../../icons/Icon";

export default {
  title: "Inputs/Select Input",
  component: SelectInput,
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
} satisfies Meta<typeof SelectInput>;

export const Default: StoryObj<typeof SelectInput> = {
  name: "Select Input",
  args: {
    label: "Label",
    autocomplete: true,
    multiple: true,
    placeholder: "Placeholder",
    icon: "stack",
    iconVariant: "regular",
    iconPosition: "end",
    description: "Description",
    variant: "normal",
    size: "md",
    width: 250,
    warning: false,
    warningText: "Warning text",
    invalid: false,
    invalidText: "Invalid text",
    disabled: false,
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
      { value: "3", label: "Option 3" },
      { value: "4", label: "Option 4" },
    ],
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
