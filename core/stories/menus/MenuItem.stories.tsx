import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { MenuButton } from "../../buttons/MenuButton";
import { MenuItem } from "../../menus/MenuItem";
import { iconVariantKeys } from "../../icons/Icon";
import { Snackbar } from "../../content/Snackbar";

export default {
  title: "Menus/Menu Item",
  component: MenuItem,
  argTypes: {
    icon: {
      control: { type: "select" },
    },
    iconVariant: {
      control: { type: "select" },
      options: iconVariantKeys,
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "warning", "danger"],
    },
  },
} satisfies Meta<typeof MenuItem>;

export const Default: StoryObj<typeof MenuItem> = {
  name: "MenuItem",
  args: {
    label: "Check",
    icon: "activity",
    color: "primary",
    size: "sm",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <MenuButton label="Menu" color="secondary">
          <MenuItem onClick={() => setOpen(true)} {...args} />
        </MenuButton>
        <Snackbar
          open={open}
          type="debug"
          message="Menu item clicked"
          duration={2000}
          closeButton={false}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: parameters(
    `<MenuButton label="Menu">
  <MenuItem label="Check" icon="activity" color="primary" />
</MenuButton>`,
    "Menu item component",
  ),
};
