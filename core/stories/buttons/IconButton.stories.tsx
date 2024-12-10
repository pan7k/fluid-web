import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { IconButton } from "../../buttons/IconButton";
import { iconSymbolKeys, iconVariantKeys } from "../../icons/Icon";

export default {
  title: "Buttons/Icon Button",
  component: IconButton,
  argTypes: {
    color: {
      options: ["primary", "secondary", "success", "danger"],
      control: { type: "select" },
    },
    variant: {
      options: ["filled", "outline", "light", "ghost"],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md"],
      control: { type: "select" },
    },
    icon: {
      control: { type: "select" },
      options: iconSymbolKeys,
    },
    iconVariant: {
      control: { type: "select" },
      options: iconVariantKeys,
    },
    direction: {
      options: ["top", "right", "bottom", "left"],
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof IconButton>;

export const Default: StoryObj<typeof IconButton> = {
  name: "IconButton",
  args: {
    color: "primary",
    variant: "filled",
    size: "md",
    icon: "plus",
    iconVariant: "regular",
    tooltip: "Add",
    direction: "right",
  },
  parameters: parameters(`<IconButton icon="plus" />`, "IconButton component"),
};
