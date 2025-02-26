import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { ColorPicker } from "../../inputs/ColorPicker";

export default {
  title: "Inputs/Color Picker",
  component: ColorPicker,
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof ColorPicker>;

export const Default: StoryObj<typeof ColorPicker> = {
  name: "Color Picker",
  args: {
    disabled: false,
  },
  render: (args) => {
    const [color, setColor] = useState("rgba(255,69,0,1)");
    return (
      <div className="flex content-center gap-2 select-none cursor-default">
        <ColorPicker {...args} value={color} onChange={setColor} />
        <div className="font-sans text-body text-text-primary">{color}</div>
      </div>
    );
  },
  parameters: parameters(
    `const [color, setColor] = useState('rgba(255,69,0,1)');

<ColorPicker
  value={color}
  onChange={setColor}
/>`,
    "Color Picker component",
  ),
};
