import React, { FC } from "react";
import styled from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { InputEventProps } from "../common/interfaces";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";

type TextInputVariant = "normal" | "fluid";
type TextInputSize = "xs" | "sm" | "md" | "lg";
type TextInputType = "email" | "password" | "text" | "url";

export interface TextInputProps extends InputEventProps {
  label: string;
  placeholder?: string;
  description?: string;
  warning?: boolean;
  warningText?: string;
  invalid?: boolean;
  invalidText?: string;
  disabled?: boolean;
  type?: TextInputType;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  variant?: TextInputVariant;
  size?: TextInputSize;
  width?: number;
}

interface BaseProps {
  theme: Theme;
  $variant: TextInputVariant;
  $icon?: "adornment" | "warning" | "invalid";
  $size: TextInputSize;
  $width?: number;
  $disabled?: boolean;
}

const Base = styled("div")<BaseProps>(
  ({ theme, $variant, $size, $width, $disabled }) => ({
    ...theme.components?.textInput?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.root,
    ...theme.components?.textInput?.size?.[$size]?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.root,
    ...($disabled && theme.components?.textInput?.state?.disabled?.root),
    width: $width ? $width : "100%",
  }),
);

const Label = styled("span")<BaseProps>(
  ({ theme, $variant, $size, $disabled }) => ({
    ...theme.components?.textInput?.text?.root,
    ...theme.components?.textInput?.text?.label,
    ...theme.components?.textInput?.variant?.[$variant]?.text?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.text?.label,
    ...theme.components?.textInput?.size?.[$size]?.text?.root,
    ...theme.components?.textInput?.size?.[$size]?.text?.label,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.text
      ?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.text
      ?.label,
    ...($disabled && theme.components?.textInput?.state?.disabled?.text?.root),
    ...($disabled && theme.components?.textInput?.state?.disabled?.text?.label),
  }),
);

const Stack = styled("div")<BaseProps>(
  ({ theme, $variant, $size, $width, $disabled }) => ({
    ...theme.components?.textInput?.stack,
    ...theme.components?.textInput?.variant?.[$variant]?.stack,
    ...theme.components?.textInput?.size?.[$size]?.stack,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.stack,
    ...($disabled && theme.components?.textInput?.state?.disabled?.stack),
    width: $width ? $width : "100%",
  }),
);

const InputBase = styled("input")<BaseProps>(
  ({ theme, $variant, $size, disabled }) => ({
    ...theme.components?.textInput?.input,
    ...theme.components?.textInput?.variant?.[$variant]?.input,
    ...theme.components?.textInput?.size?.[$size]?.input,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.input,
    ...(disabled && theme.components?.textInput?.state?.disabled?.input),
  }),
);

const IconBase = styled("div")<BaseProps>(
  ({ theme, $variant, $icon = "adornment", $size, $disabled }) => ({
    display: "contents",
    "& svg": {
      ...theme.components?.textInput?.icon?.root,
      ...theme.components?.textInput?.icon?.[$icon],
      ...theme.components?.textInput?.variant?.[$variant]?.icon?.root,
      ...theme.components?.textInput?.variant?.[$variant]?.icon?.[$icon],
      ...theme.components?.textInput?.size?.[$size]?.icon?.root,
      ...theme.components?.textInput?.size?.[$size]?.icon?.[$icon],
      ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.icon
        ?.root,
      ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]
        ?.icon?.[$icon],
      ...($disabled &&
        theme.components?.textInput?.state?.disabled?.icon?.root),
      ...($disabled &&
        theme.components?.textInput?.state?.disabled?.icon?.[$icon]),
    },
  }),
);

const Description = styled("span")<BaseProps>(
  ({ theme, $variant, $size, $disabled }) => ({
    ...theme.components?.textInput?.text?.root,
    ...theme.components?.textInput?.text?.description,
    ...theme.components?.textInput?.variant?.[$variant]?.text?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.text?.description,
    ...theme.components?.textInput?.size?.[$size]?.text?.root,
    ...theme.components?.textInput?.size?.[$size]?.text?.description,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.text
      ?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.text
      ?.description,
    ...($disabled && theme.components?.textInput?.state?.disabled?.text?.root),
    ...($disabled &&
      theme.components?.textInput?.state?.disabled?.text?.description),
  }),
);

const WarningText = styled("span")<BaseProps>(
  ({ theme, $variant, $size, $disabled }) => ({
    ...theme.components?.textInput?.text?.root,
    ...theme.components?.textInput?.text?.warning,
    ...theme.components?.textInput?.variant?.[$variant]?.text?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.text?.warning,
    ...theme.components?.textInput?.size?.[$size]?.text?.root,
    ...theme.components?.textInput?.size?.[$size]?.text?.warning,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.text
      ?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.text
      ?.warning,
    ...($disabled && theme.components?.textInput?.state?.disabled?.text?.root),
    ...($disabled &&
      theme.components?.textInput?.state?.disabled?.text?.warning),
  }),
);

const InvalidText = styled("span")<BaseProps>(
  ({ theme, $variant, $size, $disabled }) => ({
    ...theme.components?.textInput?.text?.root,
    ...theme.components?.textInput?.text?.invalid,
    ...theme.components?.textInput?.variant?.[$variant]?.text?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.text?.invalid,
    ...theme.components?.textInput?.size?.[$size]?.text?.root,
    ...theme.components?.textInput?.size?.[$size]?.text?.invalid,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.text
      ?.root,
    ...theme.components?.textInput?.variant?.[$variant]?.size?.[$size]?.text
      ?.invalid,
    ...($disabled && theme.components?.textInput?.state?.disabled?.text?.root),
    ...($disabled &&
      theme.components?.textInput?.state?.disabled?.text?.invalid),
  }),
);

export const TextInput: FC<TextInputProps> = ({
  label,
  variant = "normal",
  size = "md",
  type = "text",
  icon,
  iconVariant = "outlined",
  description,
  warning,
  warningText,
  invalid,
  invalidText,
  disabled,
  width,
  ...rest
}) => {
  return (
    <Base $variant={variant} $size={size} $width={width} $disabled={disabled}>
      {label && (
        <Label $variant={variant} $size={size} $disabled={disabled}>
          {label}
        </Label>
      )}
      <Stack
        $variant={variant}
        $size={size}
        $width={width}
        $disabled={disabled}
      >
        <InputBase
          $variant={variant}
          $size={size}
          disabled={disabled}
          {...rest}
        />
        {icon && !warning && !invalid && (
          <IconBase
            $variant={variant}
            $size={size}
            $disabled={disabled}
            $icon="adornment"
          >
            <Icon symbol={icon} variant={iconVariant} size={size} />
          </IconBase>
        )}
        {warning && !invalid && (
          <IconBase
            $variant={variant}
            $size={size}
            $disabled={disabled}
            $icon="warning"
          >
            <Icon
              symbol="warning"
              variant="filled"
              size={size}
              color="orange"
            />
          </IconBase>
        )}
        {invalid && (
          <IconBase
            $variant={variant}
            $size={size}
            $disabled={disabled}
            $icon="invalid"
          >
            <Icon symbol="error" variant="filled" size={size} color="red" />
          </IconBase>
        )}
      </Stack>
      {variant !== "fluid" && description && !warning && !invalid && (
        <Description $variant={variant} $size={size} $disabled={disabled}>
          {description}
        </Description>
      )}
      {variant !== "fluid" && warning && !invalid && (
        <WarningText $variant={variant} $size={size} $disabled={disabled}>
          {warningText}
        </WarningText>
      )}
      {variant !== "fluid" && invalid && (
        <InvalidText $variant={variant} $size={size} $disabled={disabled}>
          {invalidText}
        </InvalidText>
      )}
    </Base>
  );
};
