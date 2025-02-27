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
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");

    const handleSnack = (message: string) => {
      setSnackMessage(message);
      setSnackOpen(true);
    };

    return (
      <>
        <MenuButton
          {...args}
          onClick={() => handleSnack(`Button '${args.label}' clicked`)}
        >
          <MenuItem
            label="Add"
            icon="plus"
            onClick={() => handleSnack("Menu item 'Add' clicked")}
          />
          <MenuItem
            label="Copy"
            onClick={() => handleSnack("Menu item 'Copy' clicked")}
          />
        </MenuButton>

        <Snackbar
          open={snackOpen}
          type="debug"
          message={snackMessage}
          duration={2000}
          closeButton={false}
          onClose={() => setSnackOpen(false)}
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
