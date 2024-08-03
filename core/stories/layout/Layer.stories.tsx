import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Layer } from "../../layout/Layer";

export default {
  title: "Layout/Layer",
  component: Layer,
} satisfies Meta<typeof Layer>;

export const Default: StoryObj<typeof Layer> = {
  name: "Layer",
  args: {
    children: (
      <>
        First layer
        <Layer>
          Second layer
          <Layer>Last layer</Layer>
        </Layer>
      </>
    ),
  },
  parameters: parameters("<Layer />", "Layer component"),
};
