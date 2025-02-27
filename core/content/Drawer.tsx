import React, {
  FC,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { IconButton } from "../buttons/IconButton";
import { Theme } from "../theme/interfaces";
import { sx } from "../theme/utils/sx";

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  title?: string;
  footer?: ReactNode;
  width?: string;
  height?: string;
  classes?: Theme["drawer"];
}

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = "left",
  title,
  footer,
  width,
  height,
  classes,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const positionClass = {
    left: "drawer-left",
    right: "drawer-right",
    top: "drawer-top",
    bottom: "drawer-bottom",
  }[position];

  if (!isMounted && !isOpen) return null;

  const drawerContent = (
    <div
      className={sx(
        "drawer",
        isMounted ? "drawer-mounted" : undefined,
        isOpen ? "drawer-open" : undefined,
        classes?.drawer,
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={sx(
          "drawer-overlay",
          isOpen ? "drawer-overlay-visible" : undefined,
          classes?.overlay,
        )}
        onClick={onClose}
        role="button"
        tabIndex={-1}
        aria-label="Close drawer"
      />
      <div
        className={sx(
          "drawer-content",
          positionClass,
          isOpen ? "drawer-content-visible" : undefined,
          classes?.content,
        )}
        style={{
          width: ["top", "bottom"].includes(position) ? "100%" : width,
          height: ["top", "bottom"].includes(position) ? height : "100%",
        }}
      >
        {title && (
          <div className={sx("drawer-header", classes?.header)}>
            <div className={sx("drawer-label", classes?.label)}>{title}</div>
            <IconButton
              icon="x"
              variant="light"
              color="secondary"
              size="md"
              onClick={onClose}
            />
          </div>
        )}

        <div className={sx(classes?.body, "drawer-body")}>{children}</div>

        {footer && (
          <div className={sx("drawer-footer", classes?.footer)}>{footer}</div>
        )}
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
};
