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
    <Layer classes="border border-dashed border-red-50 !mt-0">
      <Stack>
        <Text classes="color-red-50">First layer</Text>
        <TextInput placeholder="Text input" />
        <Chip>Chip</Chip>
      </Stack>
      <Layer classes="border border-dashed border-blue-50">
        <Stack>
          <Text classes="color-blue-80">Second layer</Text>
          <TextInput placeholder="Text input" />
          <Chip>Chip</Chip>
        </Stack>
        <Layer classes="border border-dashed border-green-50">
          <Stack>
            <Text classes="color-green-80">Last layer</Text>
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
