import React, {
  BaseHTMLAttributes,
  FC,
  ReactElement,
  RefObject,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { CSS } from "../common/types";
import { sx } from "../theme/utils/sx";

export type MenuDirection =
  | "left-top"
  | "left-bottom"
  | "left-center"
  | "right-top"
  | "right-bottom"
  | "right-center"
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center";

export interface MenuListProps extends BaseHTMLAttributes<HTMLMenuElement> {
  children?: ReactElement | ReactElement[];
  width?: number;
  minWidth?: number;
  parentRef: RefObject<HTMLElement>;
  direction?: MenuDirection;
  classes?: CSS;
  offset?: number;
  selectedValues?: (string | number)[];
  onClose: () => void;
}

export const MenuList: FC<MenuListProps> = ({
  children,
  width,
  minWidth,
  parentRef,
  direction = "bottom-right",
  classes,
  offset = 1,
  selectedValues,
  onClick,
  onClose,
  ...rest
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    t: string;
    minWidth: number;
  } | null>(null);

  const setMenuPosition = () => {
    if (!parentRef.current) return;

    const rect = parentRef.current.getBoundingClientRect();
    const parentWidth = offset === 0 ? rect.width : rect.width + offset - 4;
    const margin = offset === 0 ? 0 : offset - 4;

    let x = rect.left;
    let y = rect.top;
    let t = "0%, 0%";

    switch (direction) {
      case "top-left":
        x = rect.right + 0.1 + margin;
        y = rect.top - offset;
        t = "-100%, -100%";
        break;
      case "top-right":
        x = rect.left - margin;
        y = rect.top - offset;
        t = "0%, -100%";
        break;
      case "top-center":
        x = rect.left + rect.width / 2;
        y = rect.top - offset;
        t = "-50%, -100%";
        break;
      case "bottom-left":
        x = rect.right + margin;
        y = rect.bottom + offset;
        t = "-100%, 0%";
        break;
      case "bottom-right":
        x = rect.left - margin;
        y = rect.bottom + offset;
        t = "0%, 0%";
        break;
      case "bottom-center":
        x = rect.left + rect.width / 2;
        y = rect.bottom + offset;
        t = "-50%, 0%";
        break;
      case "left-top":
        x = rect.left - offset;
        y = rect.bottom + margin;
        t = "-100%, -100%";
        break;
      case "left-bottom":
        x = rect.left - offset;
        y = rect.top - margin;
        t = "-100%, 0%";
        break;
      case "left-center":
        x = rect.left - offset;
        y = rect.top + rect.height / 2;
        t = "-100%, -50%";
        break;
      case "right-top":
        x = rect.right + offset;
        y = rect.bottom + margin;
        t = "0%, -100%";
        break;
      case "right-bottom":
        x = rect.right + offset;
        y = rect.top - margin;
        t = "0%, 0%";
        break;
      case "right-center":
        x = rect.right + offset;
        y = rect.top + rect.height / 2;
        t = "0%, -50%";
        break;
      default:
        x = rect.left - margin;
        y = rect.bottom + offset;
        t = "0%, 0%";
        break;
    }

    setPosition({ x, y, t, minWidth: Math.max(minWidth ?? 0, parentWidth) });
  };

  useLayoutEffect(() => {
    setMenuPosition();
  }, [parentRef, direction, minWidth]);

  useEffect(() => {
    setMenuPosition();
  }, [selectedValues]);

  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        parentRef.current &&
        !parentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, parentRef]);

  if (!position) {
    return null;
  }

  return createPortal(
    <menu
      ref={menuRef}
      onClick={onClick}
      style={{
        width: width ? `${width}px` : "auto",
        minWidth: `${position.minWidth}px`,
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(${position.t})`,
      }}
      className={sx("menuList menuList-scrollbar", classes)}
      {...rest}
    >
      {Array.isArray(children)
        ? children.map((child, index) => {
            if (
              !isValidElement<{
                onClick?: (event: MouseEvent) => void;
              }>(child)
            ) {
              return child;
            }

            return cloneElement(child, {
              key: index,
              onClick: (event: MouseEvent) => {
                event.stopPropagation();
                child.props.onClick?.(event);
                onClose();
              },
            });
          })
        : children}
    </menu>,
    document.body,
  );
};
