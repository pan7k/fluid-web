import { RefObject, useState, useLayoutEffect } from "react";

interface Position {
  x: number;
  y: number;
}

type RenderPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom-center"
  | "bottom-left"
  | "left";

interface UsePopoverProps {
  anchorEl: HTMLElement | null;
  popoverRef: RefObject<HTMLElement>;
  containerRef: RefObject<HTMLElement>;
  isOpen: boolean;
  renderPosition?: RenderPosition;
}

export const usePopover = ({
  anchorEl,
  popoverRef,
  containerRef,
  isOpen,
  renderPosition = "top-center",
}: UsePopoverProps) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const updatePosition = () => {
      if (anchorEl && isOpen && popoverRef.current && containerRef.current) {
        const anchorRect = containerRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        const computedStyle = window.getComputedStyle(containerRef.current);
        const borderWidth = parseInt(computedStyle.borderWidth) || 0;
        const outlineWidth = parseInt(computedStyle.outlineWidth) || 0;
        const totalOffset = borderWidth + outlineWidth;

        const spaceAbove = anchorRect.top;
        const spaceBelow = viewportHeight - anchorRect.bottom;
        const spaceLeft = anchorRect.left;
        const spaceRight = viewportWidth - anchorRect.right;

        const hasSpaceForPosition = (position: RenderPosition): boolean => {
          switch (position) {
            case "top-left":
              return spaceAbove >= popoverRect.height && anchorRect.left >= 0;
            case "top-center":
              return (
                spaceAbove >= popoverRect.height &&
                anchorRect.left + (anchorRect.width - popoverRect.width) / 2 >=
                  0 &&
                anchorRect.right - (anchorRect.width - popoverRect.width) / 2 <=
                  viewportWidth
              );
            case "top-right":
              return (
                spaceAbove >= popoverRect.height &&
                anchorRect.right <= viewportWidth
              );
            case "right":
              return (
                spaceRight >= popoverRect.width &&
                anchorRect.top + (anchorRect.height - popoverRect.height) / 2 >=
                  0 &&
                anchorRect.bottom -
                  (anchorRect.height - popoverRect.height) / 2 <=
                  viewportHeight
              );
            case "bottom-right":
              return (
                spaceBelow >= popoverRect.height &&
                anchorRect.right <= viewportWidth
              );
            case "bottom-center":
              return (
                spaceBelow >= popoverRect.height &&
                anchorRect.left + (anchorRect.width - popoverRect.width) / 2 >=
                  0 &&
                anchorRect.right - (anchorRect.width - popoverRect.width) / 2 <=
                  viewportWidth
              );
            case "bottom-left":
              return spaceBelow >= popoverRect.height && anchorRect.left >= 0;
            case "left":
              return (
                spaceLeft >= popoverRect.width &&
                anchorRect.top + (anchorRect.height - popoverRect.height) / 2 >=
                  0 &&
                anchorRect.bottom -
                  (anchorRect.height - popoverRect.height) / 2 <=
                  viewportHeight
              );
            default:
              return false;
          }
        };

        const getFallbackPosition = (
          currentPosition: RenderPosition,
        ): RenderPosition => {
          const positionOrder: RenderPosition[] = [
            "top-left",
            "top-center",
            "top-right",
            "right",
            "bottom-right",
            "bottom-center",
            "bottom-left",
            "left",
          ];

          const currentIndex = positionOrder.indexOf(currentPosition);
          const remainingPositions = [
            ...positionOrder.slice(currentIndex + 1),
            ...positionOrder.slice(0, currentIndex),
          ];

          return (
            remainingPositions.find((pos) => hasSpaceForPosition(pos)) ||
            "bottom-center"
          );
        };

        const finalPosition = hasSpaceForPosition(renderPosition)
          ? renderPosition
          : getFallbackPosition(renderPosition);

        let newPosition: Position = { x: 0, y: 0 };

        const getVerticalPosition = (preferredPosition: "top" | "bottom") => {
          if (preferredPosition === "top" && spaceAbove >= popoverRect.height) {
            return anchorRect.top - popoverRect.height - totalOffset;
          } else if (
            preferredPosition === "bottom" &&
            spaceBelow >= popoverRect.height
          ) {
            return anchorRect.bottom + totalOffset;
          } else {
            // Fallback to the side with more space
            return spaceBelow > spaceAbove
              ? anchorRect.bottom + totalOffset
              : anchorRect.top - popoverRect.height - totalOffset;
          }
        };

        const getHorizontalPosition = (
          alignment: "left" | "center" | "right",
        ) => {
          switch (alignment) {
            case "left":
              return anchorRect.left - totalOffset;
            case "right":
              return anchorRect.right - popoverRect.width + totalOffset;
            case "center":
            default:
              return (
                anchorRect.left + (anchorRect.width - popoverRect.width) / 2
              );
          }
        };

        switch (finalPosition) {
          case "top-left":
            newPosition = {
              x: getHorizontalPosition("left"),
              y: getVerticalPosition("top"),
            };
            break;
          case "top-right":
            newPosition = {
              x: getHorizontalPosition("right"),
              y: getVerticalPosition("top"),
            };
            break;
          case "bottom-left":
            newPosition = {
              x: getHorizontalPosition("left"),
              y: getVerticalPosition("bottom"),
            };
            break;
          case "bottom-right":
            newPosition = {
              x: getHorizontalPosition("right"),
              y: getVerticalPosition("bottom"),
            };
            break;
          case "left": {
            const canRenderLeft = spaceLeft >= popoverRect.width;
            const leftPosition = canRenderLeft
              ? anchorRect.left - popoverRect.width - totalOffset
              : anchorRect.right + totalOffset;

            const verticalCenter =
              anchorRect.top + (anchorRect.height - popoverRect.height) / 2;

            newPosition = {
              x: leftPosition,
              y: verticalCenter,
            };
            break;
          }
          case "right": {
            const canRenderRight = spaceRight >= popoverRect.width;
            const rightPosition = canRenderRight
              ? anchorRect.right + totalOffset
              : anchorRect.left - popoverRect.width - totalOffset;

            const verticalCenter =
              anchorRect.top + (anchorRect.height - popoverRect.height) / 2;

            newPosition = {
              x: rightPosition,
              y: verticalCenter,
            };
            break;
          }
          case "bottom-center":
            newPosition = {
              x: getHorizontalPosition("center"),
              y: getVerticalPosition("bottom"),
            };
            break;
          case "top-center":
          default:
            newPosition = {
              x: getHorizontalPosition("center"),
              y: getVerticalPosition("top"),
            };
        }

        setPosition(newPosition);
      }
    };

    // Create observers
    const resizeObserver = new ResizeObserver(updatePosition);
    const intersectionObserver = new IntersectionObserver(updatePosition, {
      threshold: 0,
      root: null,
    });

    // Initial position calculation
    updatePosition();

    // Add listeners
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true); // true for capturing phase to catch all scroll events

    // Observe container
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      intersectionObserver.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [anchorEl, isOpen, renderPosition]);

  return position;
};
