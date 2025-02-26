import React, { HTMLAttributes } from "react";
import { FC } from "react";
import { sx } from "../theme/utils/sx";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  classes?: string;
}

export const Divider: FC<DividerProps> = ({ classes }) => {
  return <hr className={sx("divider", classes)} />;
};
