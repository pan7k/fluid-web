import React, { FC } from "react";
import styled from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { InputEventProps } from "../common/interfaces";
import { Icon, IconVariant } from "../icons/Icon";

type TextInputVariant = "normal" | "fluid";
type TextInputSize = "xs" | "sm" | "md";
type TextInputType = "email" | "number" | "password" | "tel" | "text" | "url";

export interface TextInputProps extends InputEventProps {
  label: string;
  placeholder?: string;
  helperText?: string;
  warningText?: string;
  invalidText?: string;
  type?: TextInputType;
  icon?: IconVariant;
  variant?: TextInputVariant;
  size?: TextInputSize;
}

interface BaseProps {
  theme: Theme;
  $variant: TextInputVariant;
  $size: TextInputSize;
}

const Base = styled("div")<BaseProps>(({ theme, $variant, $size }) => ({
  ...theme.components?.textInput?.root,
  ...theme.components?.textInput?.variant?.[$variant]?.root,
  ...theme.components?.textInput?.size?.[$size]?.root,
}));

const Label = styled("span")<BaseProps>(({ theme, $variant, $size }) => ({
  ...theme.components?.textInput?.label,
  ...theme.components?.textInput?.variant?.[$variant]?.label,
  ...theme.components?.textInput?.size?.[$size]?.label,
}));

const Stack = styled("div")<BaseProps>(({ theme, $variant, $size }) => ({
  ...theme.components?.textInput?.stack,
  ...theme.components?.textInput?.variant?.[$variant]?.stack,
  ...theme.components?.textInput?.size?.[$size]?.stack,
}));

const InputBase = styled("input")<BaseProps>(({ theme, $variant, $size }) => ({
  ...theme.components?.textInput?.input,
  ...theme.components?.textInput?.variant?.[$variant]?.input,
  ...theme.components?.textInput?.size?.[$size]?.input,
}));

const IconBase = styled("div")<BaseProps>(({ theme, $variant, $size }) => ({
  display: "contents",
  "& svg": {
    ...theme.components?.textInput?.icon,
    ...theme.components?.textInput?.variant?.[$variant]?.icon,
    ...theme.components?.textInput?.size?.[$size]?.icon,
  },
}));

const HelperText = styled("span")<BaseProps>(({ theme, $variant, $size }) => ({
  ...theme.components?.textInput?.helperText,
  ...theme.components?.textInput?.variant?.[$variant]?.helperText,
  ...theme.components?.textInput?.size?.[$size]?.helperText,
}));

const WarningText = styled("span")<BaseProps>(({ theme, $variant, $size }) => ({
  ...theme.components?.textInput?.warningText,
  ...theme.components?.textInput?.variant?.[$variant]?.warningText,
  ...theme.components?.textInput?.size?.[$size]?.warningText,
}));

const InvalidText = styled("span")<BaseProps>(({ theme, $variant, $size }) => ({
  ...theme.components?.textInput?.invalidText,
  ...theme.components?.textInput?.variant?.[$variant]?.invalidText,
  ...theme.components?.textInput?.size?.[$size]?.invalidText,
}));

export const TextInput: FC<TextInputProps> = ({
  label,
  variant = "normal",
  size = "md",
  type = "text",
  icon,
  helperText,
  warningText,
  invalidText,
  ...rest
}) => {
  return (
    <Base $variant={variant} $size={size}>
      {label && (
        <Label $variant={variant} $size={size}>
          {label}
        </Label>
      )}
      <Stack $variant={variant} $size={size}>
        <InputBase $variant={variant} $size={size} {...rest} />
        {icon && (
          <IconBase $variant={variant} $size={size}>
            <Icon variant={icon} size={size} />
          </IconBase>
        )}
      </Stack>
      {variant !== "fluid" && helperText && !warningText && !invalidText && (
        <HelperText $variant={variant} $size={size}>
          {helperText}
        </HelperText>
      )}
      {variant !== "fluid" && warningText && !invalidText && (
        <WarningText $variant={variant} $size={size}>
          {warningText}
        </WarningText>
      )}
      {variant !== "fluid" && invalidText && (
        <InvalidText $variant={variant} $size={size}>
          {invalidText}
        </InvalidText>
      )}
    </Base>
  );
};
