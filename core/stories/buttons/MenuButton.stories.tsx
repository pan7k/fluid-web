import React, { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { MenuButton, MenuButtonProps } from "../../buttons/MenuButton";
import { MenuItem } from "../../buttons/MenuItem";
import { useTheme } from "styled-components";

export default {
  title: "Buttons/Menu Button",
  component: MenuButton,
} satisfies Meta<typeof MenuButton>;

const MenuButtonWithHooks: FC<MenuButtonProps> = (args) => {
  const theme = useTheme();
  return (
    <MenuButton {...args}>
      <MenuItem label="Add" icon="add" color={theme.palette.success.main} />
      <MenuItem label="Item 2" />
    </MenuButton>
  );
};

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
  render: (args) => <MenuButtonWithHooks {...args} />,
  parameters: parameters(
    `<MenuButton label="Menu">
  <MenuItem label="Add" icon="add" color={theme.palette.success.main} />
  <MenuItem label="Item 2" />
</MenuButton>`,
    "Menu component",
  ),
};
