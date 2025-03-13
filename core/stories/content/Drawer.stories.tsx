import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Drawer } from "../../content/Drawer";
import { Text } from "../../typography/Text";
import { Layer } from "../../layout/Layer";
import { Button } from "../../buttons/Button";
import { IconButton } from "../../buttons/IconButton";

export default {
  title: "Content/Drawer",
  component: Drawer,
  argTypes: {
    position: {
      control: { type: "select" },
      options: ["left", "right", "top", "bottom"],
    },
    title: {
      control: { type: "text" },
    },
    width: {
      control: { type: "text" },
    },
    height: {
      control: { type: "text" },
    },
    isOpen: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof Drawer>;

export const Default: StoryObj<typeof Drawer> = {
  name: "Drawer",
  args: {
    title: "Title",
    position: "left",
    width: "400px",
    height: "50%",
    footer: (
      <div className="flex gap-4">
        <Button
          label="Cancel"
          variant="outlined"
          color="secondary"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <Button label="Save" variant="filled" color="primary" />
      </div>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <IconButton
          icon="list"
          tooltip="Open Drawer"
          direction="right"
          color="secondary"
          onClick={() => setIsOpen(true)}
        />
        <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Layer classes="border border-dashed border-primary-main !mt-0">
            <Text color="info">Content</Text>
          </Layer>
        </Drawer>
      </>
    );
  },
  parameters: parameters(
    `<Drawer
  isOpen={true}
  onClose={() => {}}
  position="left"
  title="Drawer Title"
  width="400px"
  footer={<Actions />}
>
  <Content />
</Drawer>`,
    "Drawer component",
  ),
};
