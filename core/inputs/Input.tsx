import React, { FC } from "react";
import styled from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { InputEventProps } from "../common/interfaces";
import { ComponentSize } from "../common/types";
import { IconVariant } from "../icons/Icon";

type InputVariant = "normal" | "fluid";
type InputSize = Omit<ComponentSize, "xs" | "xl">;
type InputMode =
  | "date"
  | "email"
  | "number"
  | "password"
  | "tel"
  | "text"
  | "time"
  | "url";

export interface InputProps extends InputEventProps {
  label: string;
  mode?: InputMode;
  icon?: IconVariant;
  variant?: InputVariant;
  size?: InputSize;
}

interface BaseProps {
  theme: Theme;
  $variant: InputVariant;
  $size?: InputSize;
}

const Base = styled("div")<BaseProps>(({ theme, $variant, $size }) => ({
  ...theme.components?.input?.root,
  ...theme.components?.input?.variant?.[$variant]?.root,
  ...theme.components?.input?.size?.[
    $size as keyof typeof theme.components.input.size
  ],
}));

const Label = styled("span")<BaseProps>(({ theme, $variant }) => ({
  ...theme.components?.input?.text?.label,
  ...theme.components?.input?.variant?.[$variant]?.text?.label,
}));

const InputBase = styled("input")<BaseProps>(({ theme, $variant }) => ({
  ...theme.components?.input?.input,
  ...theme.components?.input?.variant?.[$variant]?.input,
}));

const HelperText = styled("span")<BaseProps>(({ theme, $variant }) => ({
  ...theme.components?.input?.text?.helper,
  ...theme.components?.input?.variant?.[$variant]?.text?.helper,
}));

const WarningText = styled("span")<BaseProps>(({ theme, $variant }) => ({
  ...theme.components?.input?.text?.warning,
  ...theme.components?.input?.variant?.[$variant]?.text?.warning,
}));

const InvalidText = styled("span")<BaseProps>(({ theme, $variant }) => ({
  ...theme.components?.input?.text?.invalid,
  ...theme.components?.input?.variant?.[$variant]?.text?.invalid,
}));

const Icon = styled("div")<BaseProps>(({ theme, $variant }) => ({
  "& svg": {
    ...theme.components?.input?.icon,
    ...theme.components?.input?.variant?.[$variant]?.icon,
  },
}));

export const Input: FC<InputProps> = ({
  label,
  variant = "normal",
  size = "md",
  mode = "text",
  icon,
  ...rest
}) => {
  return (
    <>
      {variant === "normal" && (
        <Label $variant={variant} $size={size}>
          {label}
        </Label>
      )}
      <Base $variant={variant} $size={size}>
        {variant === "fluid" && (
          <Label $variant={variant} $size={size}>
            {label}
          </Label>
        )}
        <InputBase $variant={variant} $size={size} type={mode} {...rest} />
        <Icon $variant={variant} />
        {icon}
      </Base>
    </>
  );
};
