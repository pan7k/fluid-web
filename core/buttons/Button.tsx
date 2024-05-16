import React, { FC } from "react";
import { BaseProps } from "../common/interfaces";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces";

export interface ButtonProps extends BaseProps {}

interface Props {
  theme?: Theme;
  $sx?: CSSObject;
}

export const Base = styled("button")<Props>(({ theme, $sx }) => ({
  padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
  color: `${theme.palette.text.inverted}`,
  background: `${theme.palette.primary}`,
  fontSize: `${theme.typography.body.fontSize}`,
  cursor: "pointer",
  border: "none",
  ...$sx,
}));

export const Button: FC<ButtonProps> = ({ label, sx, ...rest }) => {
  return (
    <Base $sx={sx} {...rest}>
      {label}
    </Base>
  );
};
