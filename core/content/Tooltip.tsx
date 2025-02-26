import React, {
  FC,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { sx } from "../theme/utils/sx";
import { CSS } from "../common/types";
import { Theme } from "../theme/interfaces";
import { createPortal } from "react-dom";

type TooltipSize = "sm" | "md" | "lg";
export type TooltipDirection = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  children: ReactNode;
  label: ReactNode;
  direction?: TooltipDirection;
  size?: TooltipSize;
  classes?: Theme["tooltip"];
}

interface TooltipRootProps {
  children: ReactNode;
  direction: TooltipDirection;
  targetRef: RefObject<HTMLDivElement | null>;
  size: TooltipSize;
  classes?: CSS;
}

const TooltipRoot: FC<TooltipRootProps> = ({
  children,
  targetRef,
  direction,
  size,
  classes,
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleMouseEnter = () => {
      if (targetRef.current && tooltipRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const paddingFromObject = 4;

        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;

        if (direction === "left") {
          top += rect.height / 2 - tooltipRect.height / 2;
          left -= tooltipRect.width + paddingFromObject;
        }
        if (direction === "top") {
          top -= tooltipRect.height + paddingFromObject;
          left += rect.width / 2 - tooltipRect.width / 2;
        }
        if (direction === "bottom") {
          top += rect.height + paddingFromObject;
          left += rect.width / 2 - tooltipRect.width / 2;
        }
        if (direction === "right") {
          top += rect.height / 2 - tooltipRect.height / 2;
          left += rect.width + paddingFromObject;
        }

        setPosition({ top, left });
        setVisible(true);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    const targetElement = targetRef.current;
    if (targetElement) {
      targetElement.addEventListener("mouseenter", handleMouseEnter);
      targetElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener("mouseenter", handleMouseEnter);
        targetElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [targetRef, direction]);

  return createPortal(
    <div
      ref={tooltipRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        visibility: visible ? "visible" : "hidden",
        zIndex: 9999,
      }}
      className={sx(`tooltip tooltip-${size}`, classes)}
    >
      {children}
    </div>,
    document.body,
  );
};

export const Tooltip: FC<TooltipProps> = ({
  children,
  label,
  direction = "right",
  size = "md",
  classes,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div
        className={sx("tooltip-container", classes?.container)}
        ref={targetRef}
      >
        {children}
      </div>
      <TooltipRoot
        targetRef={targetRef}
        direction={direction}
        size={size}
        classes={classes?.tooltip}
      >
        {label}
      </TooltipRoot>
    </>
  );
};
