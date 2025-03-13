import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { List } from "../../content/List";
import { ListItem } from "../../content/ListItem";

export default {
  title: "Content/List",
  component: List,
} satisfies Meta<typeof List>;

export const Default: StoryObj<typeof List> = {
  name: "List",
  args: {
    children: (
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem>Item 3</ListItem>
      </List>
    ),
  },
};
