import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Text } from "../../typography/Text";
import { Layer } from "../../layout/Layer";
import { Dialog } from "../../content/Dialog";
import { DialogPanel } from "../../content/DialogPanel";
import { Button } from "../../buttons/Button";

export default {
  title: "Content/Dialog",
  component: Dialog,
  argTypes: {
    label: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Dialog>;

export const Default: StoryObj<typeof Dialog> = {
  name: "Dialog",
  args: {
    label: "Dialog",
    active: true,
    fullscreen: false,
    closable: true,
    draggable: true,
    resizable: true,
    minimizable: true,
    maximizable: true,
    prominent: false,
    width: undefined,
    height: undefined,
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
    actions: [
      <Button label="Add" color="secondary" onClick={() => {}} />,
      <Button label="Remove" color="danger" onClick={() => {}} />,
    ],
    children: (
      <Layer classes="border border-dashed border-red-50 !m-0">
        <Text color="danger">Second layer</Text>
        <Layer classes="border border-dashed border-blue-50">
          <Text color="info">Third layer</Text>
        </Layer>
      </Layer>
    ),
  },
  render: (args) => (
    <>
      <Dialog {...args} />
      <DialogPanel />
    </>
  ),
  parameters: parameters(
    `<Dialog label="Dialog" minimizable maximizable resizable draggable>\n  <Content />\n</Dialog>\n\n<DialogPanel />`,
    "Dialog component",
  ),
};
