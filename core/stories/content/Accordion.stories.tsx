import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Accordion } from "../../content/Accordion";
import { Text } from "../../typography/Text";
import { Layer } from "../../layout/Layer";

export default {
  title: "Content/Accordion",
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export const Default: StoryObj<typeof Accordion> = {
  name: "Accordion",
  args: {
    label: "Accordion",
    icon: undefined,
    iconVariant: undefined,
    expanded: false,
    expandable: true,
    size: "md",
    children: (
      <Layer sx={{ border: "1px dashed blue", marginTop: 0 }}>
        <Text sx={{ color: "darkblue" }}>Content</Text>
      </Layer>
    ),
  },
  parameters: parameters(
    `<Accordion label="Accordion">\n  <Content />\n</Accordion>`,
    "Accordion component",
  ),
};
