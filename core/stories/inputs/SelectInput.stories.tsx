import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { SelectInput } from "../../inputs/SelectInput";
import { iconVariantKeys } from "../../icons/Icon";

export default {
  title: "Inputs/Select Input",
  component: SelectInput,
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
  argTypes: {
    options: { table: { disable: true } },
    menuSize: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg"],
    },
    chipColor: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "danger", "warning", "info"],
    },
    chipVariant: {
      control: { type: "select" },
      options: ["light", "filled"],
    },
  },
  args: {
    label: "Label",
    autocomplete: true,
    multiple: true,
    placeholder: "Placeholder",
    icon: undefined,
    iconVariant: "regular",
    iconPosition: "end",
    description: "Description",
    direction: "bottom-right",
    variant: "normal",
    size: "md",
    menuSize: undefined,
    chipColor: "primary",
    chipVariant: "light",
    width: 250,
    warning: false,
    warningText: "Warning text",
    invalid: false,
    invalidText: "Invalid text",
    disabled: false,
    clearable: false,
    value: 3,
    defaultValue: 2,
    options: [
      { value: 1, label: "Option 1" },
      { value: 2, label: "Option 2" },
      { value: 3, label: "Option 3" },
      { value: 4, label: "Option 4" },
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
