import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { IconButton } from "../../buttons/IconButton";
import { iconSymbolKeys, iconVariantKeys } from "../../icons/Icon";
import { Snackbar } from "../../content/Snackbar";

export default {
  title: "Buttons/Icon Button",
  component: IconButton,
  argTypes: {
    color: {
      options: ["primary", "secondary", "info", "success", "warning", "danger"],
      control: { type: "select" },
    },
    variant: {
      options: ["filled", "outline", "light", "ghost"],
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl"],
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
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <IconButton {...args} onClick={() => setOpen(true)} />
        <Snackbar
          open={open}
          type="debug"
          message="Icon button clicked"
          duration={2000}
          closeButton={false}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: parameters(`<IconButton icon="plus" />`, "IconButton component"),
};
