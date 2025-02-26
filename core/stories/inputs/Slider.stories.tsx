import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Slider } from "../../inputs/Slider";
import { Chip } from "../../fields/Chip";

export default {
  title: "Inputs/Slider",
  component: Slider,
  argTypes: {
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    disabled: { control: "boolean" },
    range: { control: "boolean" },
  },
} satisfies Meta<typeof Slider>;

export const Default: StoryObj<typeof Slider> = {
  name: "Slider",
  args: {
    min: 0,
    max: 100,
    step: 1,
    range: false,
  },
  render: (args) => {
    const [singleValue, setSingleValue] = useState(50);
    const [rangeValue, setRangeValue] = useState<[number, number]>([25, 75]);

    return (
      <div className="w-64">
        <Slider
          {...args}
          value={args.range ? rangeValue : singleValue}
          onChange={(newValue) => {
            if (Array.isArray(newValue)) {
              setRangeValue(newValue);
            } else {
              setSingleValue(newValue);
            }
          }}
        />
        <div className="mt-4 text-sm">
          <Chip>
            Value: {args.range ? `[${rangeValue.join(", ")}]` : singleValue}
          </Chip>
        </div>
      </div>
    );
  },
  parameters: parameters(
    `const [value, setValue] = useState(50);
    
<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={1}
  range={false}
/>`,
    "Basic slider example with optional range mode",
  ),
};
