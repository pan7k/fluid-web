import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Box } from "../../layout/Box";
import { Chip } from "../../fields/Chip";

export default {
  title: "Layout/Box",
  component: Box,
} satisfies Meta<typeof Box>;

export const Default: StoryObj<typeof Box> = {
  name: "Box",
  args: {
    children: <Chip>Box</Chip>,
    classes: "p-2 bg-surface-20 h-40",
  },
  parameters: parameters(`<Divider />`, "Divider"),
};
