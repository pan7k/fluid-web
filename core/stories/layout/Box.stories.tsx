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
    sx: {
      padding: 2,
      background: "silver",
      height: "auto",
      minHeight: "100px",
    },
  },
  parameters: parameters(`<Divider />`, "Divider"),
};
