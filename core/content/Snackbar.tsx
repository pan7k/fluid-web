import React, { FC, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";
import { Alert, AlertType, AlertVariant } from "./Alert";

export interface SnackbarProps {
  open: boolean;
  message: ReactNode;
  type?: AlertType;
  variant?: AlertVariant;
  duration?: number;
  permanent?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  onClose?: () => void;
  closeButton?: boolean;
  classes?: Theme["snackbar"];
}

export const Snackbar: FC<SnackbarProps> = ({
  open,
  message,
  type = "info",
  variant = "light",
  duration = 5000,
  position = "bottom-right",
  closeButton = true,
  permanent,
  onClose,
  classes,
}) => {
  useEffect(() => {
    if (open && duration && onClose && !permanent) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  if (!open) return null;

  const snackbar = (
    <div className={sx("snackbar", `snackbar-${position}`, classes?.snackbar)}>
      <Alert
        type={type}
        variant={variant}
        onClose={closeButton ? onClose : undefined}
      >
        {message}
      </Alert>
    </div>
  );

  return createPortal(snackbar, document.body);
};
