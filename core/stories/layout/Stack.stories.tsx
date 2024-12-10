import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Stack } from "../../layout/Stack";
import { TextInput } from "../../inputs/TextInput";
import { Button } from "../../buttons/Button";

export default {
  title: "Layout/Stack",
  component: Stack,
} satisfies Meta<typeof Stack>;

export const Default: StoryObj<typeof Stack> = {
  name: "Stack",
  args: {
    direction: "column",
    spacing: 4,
    children: [
      <TextInput label="Email" type="email" variant="fluid" />,
      <TextInput label="Password" type="password" variant="fluid" />,
      <Button label="Login" />,
    ],
  },
  parameters: parameters(
    `<Stack>
  <TextInput label="Email" type="email" variant="fluid" />,
  <TextInput label="Password" type="password" variant="fluid" />,
  <Button label="Login" />
</Stack>`,
    "Stack component",
  ),
};
