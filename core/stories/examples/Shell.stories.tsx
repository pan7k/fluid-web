import React, { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import styled from "styled-components";
import { Tooltip } from "../../content/Tooltip";
import { Button } from "../../buttons/Button";
import { IconButton } from "../../buttons/IconButton";
import { DialogPanel } from "../../content/DialogPanel";
import { Dialog } from "../../content/Dialog";
import { TextInput } from "../../inputs/TextInput";
import { Stack } from "../../layout/Stack";
import { Layer } from "../../layout/Layer";
import { SearchInput } from "../../inputs/SearchInput";
import { Checkbox } from "../../inputs/Checkbox";

export default {
  title: "Examples/Shell",
} satisfies Meta;

interface ShellProps {
  theme?: string;
}

interface BaseProps {
  $color?: string;
}

const Base = styled.div<BaseProps>(({ $color }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: $color,
}));

const SearchPanel = styled.div({
  position: "absolute",
  top: "16px",
  left: "16px",
});

const ToolsPanel = styled.div({
  position: "absolute",
  top: "16px",
  right: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const Shell: FC<ShellProps> = ({ theme = "light" }) => {
  const [open, setOpen] = useState(false);
  const color = theme === "light" ? "#ddd" : "#222";

  return (
    <Base $color={color}>
      <SearchPanel>
        <Layer sx={{ padding: 0, margin: 0 }}>
          <SearchInput placeholder="Search the map" width={300} />
        </Layer>
      </SearchPanel>
      <ToolsPanel>
        <Tooltip label="Account" direction="left">
          <IconButton icon="user" onClick={() => setOpen(true)} />
        </Tooltip>
      </ToolsPanel>
      <Dialog
        label="Account"
        active={open}
        actions={[
          <Button label="Register" variant="outline" color="secondary" />,
          <Button label="Login" color="primary" />,
        ]}
        draggable
        resizable
        minimizable
        maximizable
        closable
        onClose={() => setOpen(false)}
        width="350px"
      >
        <Stack>
          <TextInput label="Email" type="email" />
          <TextInput label="Password" type="password" />
          <Checkbox label="Remember me" />
        </Stack>
      </Dialog>
      <DialogPanel variant="filled" sx={{ marginLeft: "16px" }} />
    </Base>
  );
};

export const Default: StoryObj = {
  name: "Shell",
  render: (args, { globals: { theme } }) => {
    return <Shell theme={theme} {...args} />;
  },
  parameters: parameters(
    `// App shell component example`,
    "App shell component example",
  ),
};
