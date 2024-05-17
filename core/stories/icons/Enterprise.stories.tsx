import type { Meta, StoryObj } from "@storybook/react";
import { createParameters } from "../../storybook/createParameters";
import { Enterprise } from "@carbon/icons-react";

export default {
  title: "Icons/Enterprise",
  component: Enterprise,
} satisfies Meta<typeof Enterprise>;

export const Default: StoryObj<typeof Enterprise> = {
  name: "Enterprise",
  args: {
    size: 24,
    color: "black",
  },
  parameters: createParameters("<Enterprise />", "Carbon icon"),
};
