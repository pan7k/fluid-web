import React, {
  FC,
  ReactNode,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";

type TooltipSize = "sm" | "md" | "lg";
type TooltipAlignment = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  children: ReactNode;
  label: ReactNode;
  alignment?: TooltipAlignment;
  size?: TooltipSize;
  sx?: CSSObject;
}

interface TooltipRootProps {
  children: ReactNode;
  alignment: TooltipAlignment;
  targetRef: MutableRefObject<HTMLDivElement | null>;
  size: TooltipSize;
  sx?: CSSObject;
}

interface BaseProps {
  theme: Theme;
  $top: number;
  $left: number;
  $visible: boolean;
  $size: TooltipSize;
  $sx?: CSSObject;
}

const Container = styled.div(() => ({
  display: "inline-block",
}));

const TooltipBase = styled.div<BaseProps>(
  ({ theme, $top, $left, $visible, $size, $sx }) => ({
    top: `${$top}px`,
    left: `${$left}px`,
    visibility: $visible ? "visible" : "hidden",
    ...theme.components?.tooltip?.root,
    ...theme.components?.tooltip?.size?.[$size],
    ...$sx,
  }),
);

const TooltipRoot: FC<TooltipRootProps> = ({
  children,
  targetRef,
  alignment,
  size,
  sx,
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

        let top = rect.bottom + window.scrollY - 60;
        let left = rect.left + window.scrollX;

        if (alignment === "left") {
          top =
            rect.bottom +
            window.scrollY -
            rect.height / 2 -
            tooltipRect.height / 2;
          left =
            rect.left + window.scrollX - tooltipRect.width - paddingFromObject;
        }

        if (alignment === "top") {
          top =
            rect.bottom +
            window.scrollY -
            (rect.height + tooltipRect.height) -
            paddingFromObject;
          left =
            rect.left + window.scrollX - tooltipRect.width / 2 + rect.width / 2;
        }

        if (alignment === "bottom") {
          top = rect.bottom + window.scrollY + paddingFromObject;
          left =
            rect.left + window.scrollX - tooltipRect.width / 2 + rect.width / 2;
        }

        if (alignment === "right") {
          top =
            rect.bottom +
            window.scrollY -
            rect.height / 2 -
            tooltipRect.height / 2;
          left = rect.left + window.scrollX + rect.width + paddingFromObject;
        }

        setPosition({
          top,
          left,
        });

        setVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

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
  }, [targetRef, tooltipRef, alignment]);

  return (
    <TooltipBase
      ref={tooltipRef}
      $visible={visible}
      $top={position.top}
      $left={position.left}
      $size={size}
      $sx={sx}
    >
      {children}
    </TooltipBase>
  );
};

export const Tooltip: FC<TooltipProps> = ({
  children,
  label,
  alignment = "right",
  size = "md",
  sx,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Container ref={targetRef}>{children}</Container>
      <TooltipRoot
        targetRef={targetRef}
        alignment={alignment}
        size={size}
        sx={sx}
      >
        {label}
      </TooltipRoot>
    </>
  );
};
