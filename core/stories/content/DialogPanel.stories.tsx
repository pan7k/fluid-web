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
  render: (args) => (
    <>
      <Dialog label="Dialog 1" active draggable resizable minimizable>
        <Layer sx={{ border: "1px dashed red", margin: 0 }}>
          <Text sx={{ color: "darkred" }}>First dialog</Text>
        </Layer>
      </Dialog>
      <Dialog label="Dialog 2" active draggable resizable minimizable>
        <Layer sx={{ border: "1px dashed green", margin: 0 }}>
          <Text sx={{ color: "darkgreen" }}>Second dialog</Text>
        </Layer>
      </Dialog>
      <Dialog label="Dialog 3" active draggable resizable minimizable>
        <Layer sx={{ border: "1px dashed blue", margin: 0 }}>
          <Text sx={{ color: "darkblue" }}>Third dialog</Text>
        </Layer>
      </Dialog>
      <DialogPanel {...args} />
    </>
  ),
  parameters: parameters(`<DialogPanel />`, "Dialog panel"),
};
