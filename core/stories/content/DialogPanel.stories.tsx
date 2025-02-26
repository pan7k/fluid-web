import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Text } from "../../typography/Text";
import { Layer } from "../../layout/Layer";
import { Dialog } from "../../content/Dialog";
import { DialogPanel } from "../../content/DialogPanel";

export default {
  title: "Content/Dialog Panel",
  component: DialogPanel,
} satisfies Meta<typeof DialogPanel>;

export const Default: StoryObj<typeof DialogPanel> = {
  name: "Dialog Panel",
  args: {
    variant: "light",
    color: "secondary",
    size: "sm",
  },
  render: (args) => (
    <>
      <Dialog label="Dialog 1" active draggable resizable minimizable>
        <Layer classes="border border-dashed border-red-50 !m-0">
          <Text color="danger">First dialog</Text>
        </Layer>
      </Dialog>
      <Dialog label="Dialog 2" active draggable resizable minimizable>
        <Layer classes="border border-dashed border-green-50 !m-0">
          <Text color="success">Second dialog</Text>
        </Layer>
      </Dialog>
      <Dialog label="Dialog 3" active draggable resizable minimizable>
        <Layer classes="border border-dashed border-blue-50 !m-0">
          <Text color="info">Third dialog</Text>
        </Layer>
      </Dialog>
      <DialogPanel {...args} />
    </>
  ),
  parameters: parameters(`<DialogPanel />`, "Dialog panel"),
};
