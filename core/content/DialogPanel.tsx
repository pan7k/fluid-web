import React, { FC } from "react";
import styled, { CSSObject } from "styled-components";
import { useDialogContext } from "./DialogContext";
import { Theme } from "../theme/interfaces/theme";
import { Button, ButtonColor, ButtonVariant } from "../buttons/Button";
import { ComponentSize } from "../common/types";

export interface DialogPanelProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ComponentSize;
  sx?: CSSObject;
}

interface BaseProps {
  theme: Theme;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.dialog?.panel,
  ...$sx,
}));

export const DialogPanel: FC<DialogPanelProps> = ({
  variant = "light",
  color = "secondary",
  size = "sm",
  sx,
}) => {
  const { minimizedDialogs, removeMinimizedDialog } = useDialogContext();
  if (minimizedDialogs.length === 0) return null;

  return (
    <Base $sx={sx}>
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
        />
      ))}
    </Base>
  );
};
