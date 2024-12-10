import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Tooltip } from "../../content/Tooltip";
import { Button } from "../../buttons/Button";

export default {
  title: "Content/Tooltip",
  component: Tooltip,
  argTypes: {
    label: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Tooltip>;

export const Default: StoryObj<typeof Tooltip> = {
  name: "Tooltip",
  args: {
    label: "Tooltip",
    direction: "bottom",
    size: "md",
    children: (
      <Button label="Button with tooltip" variant="light" color="secondary" />
    ),
  },

  parameters: parameters(
    `<Tooltip label="Tooltip">\n  <Button label="Button with tooltip" variant="light" color="secondary" />\n</Tooltip>`,
    "Tooltip component",
  ),
};
