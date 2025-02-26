import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Accordion } from "../../content/Accordion";
import { Text } from "../../typography/Text";
import { Layer } from "../../layout/Layer";
import { iconSymbolKeys, iconVariantKeys } from "../../icons/Icon";
import { IconButton } from "../../buttons/IconButton";
import { useArgs } from "storybook/internal/preview-api";
import { Snackbar } from "../../content/Snackbar";

export default {
  title: "Content/Accordion",
  component: Accordion,
  argTypes: {
    label: {
      control: { type: "text" },
    },
    icon: {
      control: { type: "select" },
      options: iconSymbolKeys,
    },
    iconVariant: {
      control: { type: "select" },
      options: iconVariantKeys,
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md"],
    },
  },
} satisfies Meta<typeof Accordion>;

export const Default: StoryObj<typeof Accordion> = {
  name: "Accordion",
  args: {
    label: "Accordion",
    icon: undefined,
    iconVariant: undefined,
    expanded: false,
    expandable: true,
    size: "md",
    children: (
      <Layer classes="border border-dashed border-blue-50 !mt-1">
        <Text color="info">Content</Text>
      </Layer>
    ),
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Accordion
          {...args}
          actions={
            <IconButton
              tooltip="Edit"
              variant="ghost"
              color="secondary"
              size={args.size}
              icon="pencil"
              onClick={() => setOpen(true)}
            />
          }
        >
          {args.children}
        </Accordion>
        <Snackbar
          open={open}
          type="debug"
          message="Edit button clicked"
          duration={2000}
          closeButton={false}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
  parameters: parameters(
    `<Accordion 
  label="Accordion"
  icon="info"
  actions={<>
    <IconButton icon="edit" variant="ghost" color="secondary" size="sm" tooltip="Edit" />
    <IconButton icon="trash" variant="ghost" color="danger" size="sm" tooltip="Delete" />
  </>}
>\n  <Content />\n</Accordion>`,
    "Accordion component with actions",
  ),
};
