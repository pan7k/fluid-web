import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { List } from "../../content/List";
import { ListItem } from "../../content/ListItem";

export default {
  title: "Content/List Item",
  component: ListItem,
} satisfies Meta<typeof ListItem>;

export const Default: StoryObj<typeof ListItem> = {
  name: "List Item",
  args: {
    children: (
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    ),
  },
  render: (args) => {
    return (
      <List>
        <ListItem {...args}>Item 1</ListItem>
        <ListItem {...args}>Item 2</ListItem>
        <ListItem {...args}>Item 3</ListItem>
      </List>
    );
  },
};
