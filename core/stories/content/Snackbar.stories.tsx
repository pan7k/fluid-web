import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Snackbar } from "../../content/Snackbar";
import { Button } from "../../buttons/Button";

const meta = {
  title: "Content/Snackbar",
  component: Snackbar,
  argTypes: {
    type: {
      control: "select",
      options: ["info", "success", "warning", "error", "bug", "debug"],
    },
    variant: {
      control: "select",
      options: ["filled", "outline", "light"],
    },
    position: {
      control: "select",
      options: ["top-left", "top-right", "bottom-left", "bottom-right"],
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;

export const Default: StoryObj<typeof Snackbar> = {
  name: "Snackbar",
  args: {
    type: "info",
    variant: "filled",
    message: "This is a snackbar message",
    duration: 5000,
    position: "bottom-right",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button
          label="Show Snackbar"
          color="secondary"
          onClick={() => setOpen(true)}
        />
        <Snackbar {...args} open={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
  parameters: parameters(
    `const [open, setOpen] = useState(false);

<Snackbar
  open={open}
  onClose={() => setOpen(false)}
  message="This is a snackbar message"
/>`,
    "Basic snackbar example",
  ),
};
