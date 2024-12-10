import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { CSSRadio } from "../theme/interfaces/radio";
import { Text } from "../typography/Text";

export interface Option {
  label: string;
  value: string;
}

export interface RadioProps {
  label: string;
  options: Option[];
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  sx?: CSSRadio;
}

interface BaseProps {
  theme?: Theme;
  $disabled?: boolean;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.radio?.root,
  ...$sx,
}));

const Stack = styled.label<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.radio?.stack,
  ...$sx,
  cursor: "pointer", // vizuálna indikácia, že je klikateľné
}));

const Input = styled.input<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.radio?.input,
  ...$sx,
}));

export const Radio: FC<RadioProps> = ({
  label,
  options,
  defaultValue,
  disabled,
  onChange,
  sx,
}) => {
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <Base $sx={sx?.root}>
      {label}
      {options &&
        options.map((option) => (
          <Stack key={option.value} $sx={sx?.stack}>
            <Input
              type="radio"
              name={label}
              value={option.value}
              defaultChecked={defaultValue === option.value}
              disabled={disabled}
              onChange={() => handleChange(option.value)}
              $sx={sx?.input}
            />
            {option.label}
          </Stack>
        ))}
    </Base>
  );
};
