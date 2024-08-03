import React, { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { parameters } from "../../storybook/parameters";
import { Button, ButtonProps } from "../../buttons/Button";
import { AddLarge } from "@carbon/icons-react";

export default {
  title: "Buttons/Button",
  component: Button,
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
    icon: "add",
  },
  render: (args) => <ButtonWithHooks {...args} />,
  parameters: parameters("<Button />", "Button component"),
};
