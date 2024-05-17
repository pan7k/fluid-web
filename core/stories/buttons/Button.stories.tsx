import React, { FC, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { createParameters } from "../../storybook/createParameters";
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

  const text = `${label} clicked ${count} times`;
  return <Button label={text} onClick={handleClick} {...rest} />;
};

export const Default: StoryObj<typeof Button> = {
  name: "Button",
  args: {
    label: "Button",
    icon: <AddLarge />,
  },
  render: (args) => <ButtonWithHooks {...args} />,
  parameters: createParameters("<Button />", "Button component"),
};
