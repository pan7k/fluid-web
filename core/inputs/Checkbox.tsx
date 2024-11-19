import React, { FC, useEffect, useRef } from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { CSSCheckbox } from "../theme/interfaces/checkbox";

type CheckboxLabelPosition = "left" | "right";

export interface CheckboxProps {
  id?: string;
  label?: string;
  labelPosition?: CheckboxLabelPosition;
  defaultValue?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  sx?: CSSCheckbox;
}

interface BaseProps {
  theme?: Theme;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.checkbox?.root,
  ...$sx,
}));

const Input = styled.input<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.checkbox?.input,
  ...$sx,
}));

export const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  labelPosition = "right",
  defaultValue,
  indeterminate,
  disabled,
  onChange,
  sx,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const handleClick = () => {
    if (disabled || !inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <Base $sx={sx?.root} onClick={handleClick}>
      {label && labelPosition === "left" && label}
      <Input
        id={id || Math.floor(Math.random() * 10000).toString()}
        ref={inputRef}
        type="checkbox"
        defaultChecked={defaultValue}
        disabled={disabled}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        $sx={sx?.input}
      />
      {label && labelPosition === "right" && label}
    </Base>
  );
};
