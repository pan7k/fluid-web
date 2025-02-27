import React, { FC, ReactNode } from "react";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";
import { Icon, IconSymbol } from "../icons/Icon";
import { IconButton } from "../buttons/IconButton";
import { ButtonColor } from "../buttons/Button";

export type AlertType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "bug"
  | "debug";
export type AlertVariant = "filled" | "outline" | "light";

export interface AlertProps {
  children: ReactNode;
  type?: AlertType;
  variant?: AlertVariant;
  showIcon?: boolean;
  onClose?: () => void;
  classes?: Theme["message"];
}

const typeToIcon: Record<AlertType, IconSymbol> = {
  info: "info",
  success: "check",
  warning: "warning",
  error: "warningCircle",
  bug: "bug",
  debug: "terminal",
};

const typeToColor: Record<AlertType, ButtonColor> = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "danger",
  bug: "danger",
  debug: "debug",
};

export const Alert: FC<AlertProps> = ({
  children,
  type = "info",
  variant = "light",
  showIcon = true,
  onClose,
  classes,
}) => {
  return (
    <div
      className={sx(
        "alert",
        `alert-${variant}-${typeToColor[type]}`,
        classes?.message,
      )}
      role="alert"
    >
      {showIcon && (
        <div className={sx("alert-icon", classes?.icon)}>
          <Icon symbol={typeToIcon[type]} size="sm" variant="fill" />
        </div>
      )}
      <div className={sx("alert-content", classes?.content)}>{children}</div>
      {onClose && (
        <IconButton
          classes={{ button: "alert-close" }}
          color={typeToColor[type] as ButtonColor}
          variant={variant === "outline" ? "ghost" : variant}
          onClick={onClose}
          aria-label="Close alert"
          icon="x"
          size="md"
        />
      )}
    </div>
  );
};
