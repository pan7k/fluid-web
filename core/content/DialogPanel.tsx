import React, { FC } from "react";
import { useDialogContext } from "./DialogContext";
import { Button, ButtonColor, ButtonVariant } from "../buttons/Button";
import { ComponentSize } from "../common/types";
import { sx } from "../theme/utils/sx";
import { Theme } from "../theme/interfaces";

export interface DialogPanelProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ComponentSize;
  classes?: Theme["dialogPanel"];
}

export const DialogPanel: FC<DialogPanelProps> = ({
  variant = "light",
  color = "secondary",
  size = "sm",
  classes,
}) => {
  const { minimizedDialogs, removeMinimizedDialog } = useDialogContext();
  if (minimizedDialogs.length === 0) return null;

  return (
    <div className={sx("dialogPanel", classes?.dialogPanel)}>
      {minimizedDialogs.map((dialog) => (
        <Button
          label={dialog.label}
          key={dialog.id}
          variant={variant}
          color={color}
          size={size}
          onClick={() => {
            dialog.restore();
            removeMinimizedDialog(dialog.id);
          }}
          classes={classes?.button}
        />
      ))}
    </div>
  );
};
