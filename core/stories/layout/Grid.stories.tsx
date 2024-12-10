import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Grid } from "../../layout/Grid";
import { Chip } from "../../fields/Chip";

export default {
  title: "Layout/Grid",
  component: Grid,
} satisfies Meta<typeof Grid>;

export const Default: StoryObj<typeof Grid> = {
  name: "Grid",
  args: {
    children: [<Chip>Item 1</Chip>, <Chip>Item 2</Chip>],
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(4, 1fr)",
    sx: {},
  },
  parameters: parameters(`<Divider />`, "Divider"),
};
