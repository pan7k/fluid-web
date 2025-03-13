import React, { FC } from "react";
import { sx } from "../theme/utils/sx";

export interface ListProps {
  children: React.ReactNode;
  className?: string;
}

export const List: FC<ListProps> = ({ children, className = "" }) => {
  return <ul className={sx(`list ${className}`)}>{children}</ul>;
};
