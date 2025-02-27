import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Button } from "../../buttons/Button";
import { iconSymbolKeys } from "../../icons/Icon";
import { Snackbar } from "../../content/Snackbar";

export default {
  title: "Buttons/Button",
  component: Button,
  argTypes: {
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "danger",
        "debug",
      ],
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "outline", "light", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    icon: {
      control: { type: "select" },
      options: iconSymbolKeys,
    },
    iconVariant: {
      control: { type: "select" },
      options: ["thin", "light", "regular", "bold", "fill", "duotone"],
    },
  },
} satisfies Meta<typeof Button>;

export const Default: StoryObj<typeof Button> = {
  name: "Button",
  args: {
    label: "Button",
    color: "primary",
    variant: "filled",
    size: "md",
    icon: "plus",
    type: "button",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button {...args} onClick={() => setOpen(true)} />
        <Snackbar
          open={open}
          type="debug"
          message="Button clicked"
          duration={2000}
          closeButton={false}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: parameters(
    `<Button label="Button" icon="plus" />`,
    "Button component",
  ),
};
