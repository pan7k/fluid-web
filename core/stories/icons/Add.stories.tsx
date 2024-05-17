import type { Meta, StoryObj } from "@storybook/react";
import { createParameters } from "../../storybook/createParameters";
import { Add } from "@carbon/icons-react";

export default {
  title: "Icons/Add",
  component: Add,
} satisfies Meta<typeof Add>;

export const Default: StoryObj<typeof Add> = {
  name: "Add",
  args: {
    size: 24,
    color: "black",
  },
  parameters: createParameters("<Add />", "Carbon icon"),
};
