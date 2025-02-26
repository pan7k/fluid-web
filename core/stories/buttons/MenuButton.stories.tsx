import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { MenuButton } from "../../buttons/MenuButton";
import { MenuItem } from "../../menus/MenuItem";
import { iconSymbolKeys } from "../../icons/Icon";
import { Snackbar } from "../../content/Snackbar";

export default {
  title: "Buttons/Menu Button",
  component: MenuButton,
  argTypes: {
    icon: {
      control: { type: "select" },
      options: iconSymbolKeys,
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "info", "success", "warning", "danger"],
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "outline", "light", "ghost"],
    },
  },
} satisfies Meta<typeof MenuButton>;

export const Default: StoryObj<typeof MenuButton> = {
  name: "MenuButton",
  args: {
    label: "Menu",
    combined: false,
    icon: undefined,
    color: "primary",
    size: "md",
    variant: "filled",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <MenuButton {...args} onClick={() => setOpen(true)}>
          <MenuItem label="Add" icon="plus" onClick={() => setOpen(true)} />
          <MenuItem label="Copy" onClick={() => setOpen(true)} />
        </MenuButton>
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
    `<MenuButton label="Menu">
  <MenuItem label="Add" icon="plus" color="primary" />
  <MenuItem label="Copy" />
</MenuButton>`,
    "Menu button component",
  ),
};
