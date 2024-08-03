import React, { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Layer, LayerProps } from "../../layout/Layer";
import { Text } from "../../typography/Text";

export default {
  title: "Layout/Layer",
  component: Layer,
} satisfies Meta<typeof Layer>;

const LayerWithOutline: FC<LayerProps> = () => {
  return (
    <Layer sx={{ border: "1px dashed red" }}>
      <Text sx={{ color: "darkred" }}>First layer</Text>
      <Layer sx={{ border: "1px dashed blue" }}>
        <Text sx={{ color: "darkblue" }}>Second layer</Text>
        <Layer sx={{ border: "1px dashed green" }}>
          <Text sx={{ color: "darkgreen" }}>Last layer</Text>
        </Layer>
      </Layer>
    </Layer>
  );
};

export const Default: StoryObj<typeof Layer> = {
  name: "Layer",
  args: {
    sx: {},
  },
  render: (args) => <LayerWithOutline {...args} />,
  parameters: parameters(
    `<Layer>
  <Text>First layer</Text>
  <Layer>
    <Text>Second layer</Text>
    <Layer>
      <Text>Last layer</Text>
    </Layer>
  </Layer>
</Layer>
    `,
    "Layer component",
  ),
};
