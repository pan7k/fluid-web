import React, { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Button, ButtonProps } from "../../buttons/Button";
import { iconSymbolKeys } from "../../icons/Icon";

export default {
  title: "Buttons/Button",
  component: Button,
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "danger"],
    },
    variant: {
      control: { type: "select" },
      options: ["filled", "outline", "light", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    icon: {
      control: { type: "select" },
      options: iconSymbolKeys,
    },
  },
} satisfies Meta<typeof Button>;

const ButtonWithHooks: FC<ButtonProps> = ({ label, ...rest }) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  const text = `${label} ${count}`;
  return <Button label={text} onClick={handleClick} {...rest} />;
};

export const Default: StoryObj<typeof Button> = {
  name: "Button",
  args: {
    label: "Button",
    color: "primary",
    variant: "filled",
    size: "md",
    icon: "plus",
  },
  render: (args) => <ButtonWithHooks {...args} />,
  parameters: parameters(
    `<Button label="Button" icon="add" />`,
    "Button component",
  ),
};
