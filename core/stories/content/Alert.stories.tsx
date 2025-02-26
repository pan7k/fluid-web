import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Alert } from "../../content/Alert";

const meta = {
  title: "Content/Alert",
  component: Alert,
  argTypes: {
    showIcon: { control: "boolean" },
  },
} satisfies Meta<typeof Alert>;

export default meta;

export const Default: StoryObj<typeof Alert> = {
  name: "Alert",
  args: {
    children: "This is an alert",
    type: "info",
    variant: "light",
    showIcon: true,
  },
  parameters: parameters(
    `<Alert type="info" variant="light">
  This is an alert
</Alert>`,
    "Alert component",
  ),
};
