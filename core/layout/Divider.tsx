import React from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { FC } from "react";

export interface DividerProps {
  sx?: CSSObject;
}

interface BaseProps {
  theme: Theme;
  $sx?: CSSObject;
}

const Base = styled.hr<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.divider,
  ...$sx,
}));

export const Divider: FC<DividerProps> = ({ sx }) => {
  return <Base $sx={sx} />;
};
