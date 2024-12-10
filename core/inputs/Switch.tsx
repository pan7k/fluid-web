import React, { FC, useState } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { CSSSwitch } from "../theme/interfaces/switch";

type SwitchLabelPosition = "left" | "right";

export interface SwitchProps {
  label?: string;
  labelPosition?: SwitchLabelPosition;
  defaultValue?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  sx?: CSSSwitch;
}

interface BaseProps {
  theme?: Theme;
  $checked?: boolean;
  $disabled?: boolean;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(({ theme, $sx, $checked, $disabled }) => ({
  ...theme?.components?.switch?.root,
  ...($checked ? theme?.components?.switch?.checked?.root : {}),
  ...($disabled ? theme?.components?.switch?.disabled?.root : {}),
  ...$sx,
}));

const Stack = styled.div<BaseProps>(({ theme, $sx, $checked, $disabled }) => ({
  ...theme?.components?.switch?.stack,
  ...($checked ? theme?.components?.switch?.checked?.stack : {}),
  ...($disabled ? theme?.components?.switch?.disabled?.stack : {}),
  ...$sx,
}));

const Knob = styled.div<BaseProps>(({ theme, $sx, $checked, $disabled }) => ({
  ...theme?.components?.switch?.knob,
  ...($checked ? theme?.components?.switch?.checked?.knob : {}),
  ...($disabled ? theme?.components?.switch?.disabled?.knob : {}),
  ...$sx,
}));

const Input = styled.input<BaseProps>(({ theme, $sx, $checked, disabled }) => ({
  ...theme?.components?.switch?.input,
  ...($checked ? theme?.components?.switch?.checked?.input : {}),
  ...(disabled ? theme?.components?.switch?.disabled?.input : {}),
  ...$sx,
}));

export const Switch: FC<SwitchProps> = ({
  label,
  labelPosition = "right",
  defaultValue,
  disabled,
  onChange,
  sx,
}) => {
  const [isChecked, setIsChecked] = useState(defaultValue || false);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <Base $sx={sx?.root} onClick={handleToggle}>
      {label && labelPosition === "left" && label}
      <Stack
        $sx={sx?.stack}
        $checked={isChecked}
        $disabled={disabled}
        onClick={handleToggle}
      >
        <Input
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          onChange={handleToggle}
          $sx={sx?.input}
        />
        <Knob $sx={sx?.knob} $checked={isChecked} $disabled={disabled} />
      </Stack>
      {label && labelPosition === "right" && label}
    </Base>
  );
};
