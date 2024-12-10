import React, { FC } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Layer, LayerProps } from "../../layout/Layer";
import { Text } from "../../typography/Text";
import { TextInput } from "../../inputs/TextInput";
import { Chip } from "../../fields/Chip";
import { Stack } from "../../layout/Stack";

export default {
  title: "Layout/Layer",
  component: Layer,
} satisfies Meta<typeof Layer>;

const LayerWithOutline: FC<LayerProps> = () => {
  return (
    <Layer sx={{ border: "1px dashed red", marginTop: 0 }}>
      <Stack>
        <Text sx={{ color: "darkred" }}>First layer</Text>
        <TextInput placeholder="Text input" />
        <Chip>Chip</Chip>
      </Stack>
      <Layer sx={{ border: "1px dashed blue" }}>
        <Stack>
          <Text sx={{ color: "darkblue" }}>Second layer</Text>
          <TextInput placeholder="Text input" />
          <Chip>Chip</Chip>
        </Stack>
        <Layer sx={{ border: "1px dashed green" }}>
          <Stack>
            <Text sx={{ color: "darkgreen" }}>Last layer</Text>
            <TextInput placeholder="Text input" />
            <Chip>Chip</Chip>
          </Stack>
        </Layer>
      </Layer>
    </Layer>
  );
};

export const Default: StoryObj<typeof Layer> = {
  name: "Layer",
  args: {},
  render: (args) => <LayerWithOutline {...args} />,
  parameters: parameters(
    `<Layer sx={{ marginTop: 0 }}>
  <Content />
  <Layer>
    <Content />
    <Layer>
      <Content />
    </Layer>
  </Layer>
</Layer>`,
    "Layer component",
  ),
};
