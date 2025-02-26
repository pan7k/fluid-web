import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from "../../navigation/Navigation";
import { NavigationItem } from "../../navigation/NavigationItem";
import { parameters } from "../../storybook/parameters";
import { Layer } from "../../layout/Layer";
import { Snackbar } from "../../content/Snackbar";

const meta: Meta<typeof Navigation> = {
  title: "Menus/Navigation",
  component: Navigation,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md"],
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;

export const Default: StoryObj<typeof Navigation> = {
  name: "Navigation",
  args: {
    variant: "vertical",
    size: "md",
  },
  render: (args) => {
    const [activeItem, setActiveItem] = useState("Dashboard");
    const handleClick = (label: string) => {
      setActiveItem(label);
    };

    return (
      <>
        <Layer classes="!-m-4">
          <Navigation {...args}>
            {[
              { label: "Dashboard", icon: "browser" },
              { label: "Apps", icon: "appWindow" },
              { label: "Tenants", icon: "buildings" },
              { label: "Users", icon: "user" },
              { label: "Console", icon: "terminalWindow" },
            ].map((item) => (
              <NavigationItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                active={activeItem === item.label}
                onClick={() => handleClick(item.label)}
              />
            ))}
          </Navigation>
        </Layer>
        <Snackbar
          open={true}
          type="debug"
          message={`Active menu: ${activeItem}`}
          permanent
          closeButton={false}
        />
      </>
    );
  },
  parameters: parameters(
    `<Navigation variant="vertical" size="md">
  <NavigationItem label="Dashboard" icon="browser" active />
  <NavigationItem label="Users" icon="user" />
  <NavigationItem label="Settings" icon="gear" />
  <NavigationItem label="Profile" icon="graph" />
</Navigation>`,
    "Navigation component",
  ),
};
