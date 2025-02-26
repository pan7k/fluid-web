import React, { FC } from "react";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  prominent?: boolean;
  classes?: Theme["loader"];
}

export const Spinner: FC<SpinnerProps> = ({
  size = "md",
  prominent = false,
  classes,
}) => {
  const spinner = (
    <div
      className={sx("spinner", `spinner-${size}`, classes?.loader)}
      role="status"
    >
      <div className={sx("spinner-spinner", classes?.spinner)} />
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (prominent) {
    return (
      <div className={sx("spinner-overlay", classes?.overlay)}>{spinner}</div>
    );
  }

  return spinner;
};
