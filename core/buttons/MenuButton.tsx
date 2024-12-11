import React, {
  FC,
  ReactElement,
  Children,
  useEffect,
  useRef,
  useState,
  cloneElement,
  useLayoutEffect,
  isValidElement,
  MouseEvent,
} from "react";
import { MenuList } from "./MenuList";
import { Button, ButtonProps } from "./Button";
import { IconButton } from "./IconButton";
import styled from "styled-components";

export interface MenuButtonProps extends Omit<ButtonProps, "label" | "size"> {
  label?: string;
  children: ReactElement | ReactElement[];
  size?: "xs" | "sm" | "md";
  combined?: boolean;
  direction?: "left" | "right";
}

const Stack = styled.div({
  display: "inline-flex",
  alignItems: "center",
  gap: "1px",
});

// TODO: Add positioning for the dropdown
export const MenuButton: FC<MenuButtonProps> = ({
  children,
  label,
  icon,
  combined,
  onClick,
  direction = "left",
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (buttonRef.current && open) {
      const rect = buttonRef.current.getBoundingClientRect();
      const menuWidth = menuRef.current?.offsetWidth ?? 0;

      const left =
        direction === "right" ? rect.right - menuWidth - 4.5 : rect.left;

      setMenuPosition({ top: rect.bottom + 5, left: Math.max(left, 0) });
    }
  }, [open, direction]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {!combined &&
        (label ? (
          <Button
            label={label}
            icon={icon ? icon : open ? "caretUp" : "caretDown"}
            onClick={toggleMenu}
            ref={buttonRef}
            {...props}
          />
        ) : (
          <IconButton
            icon={icon ? icon : open ? "caretUp" : "caretDown"}
            onClick={toggleMenu}
            ref={buttonRef}
            {...props}
          />
        ))}
      {combined && (
        <Stack>
          {label && (
            <Button
              label={label}
              onClick={onClick}
              sx={{ paddingRight: "25px" }}
              {...props}
            />
          )}
          <IconButton
            icon={icon ? icon : open ? "caretUp" : "caretDown"}
            onClick={toggleMenu}
            ref={buttonRef}
            sx={label ? { paddingLeft: "8px", paddingRight: "8px" } : {}}
            {...props}
          />
        </Stack>
      )}
      {open && (
        <MenuList
          position={menuPosition}
          ref={menuRef}
          minWidth={(buttonRef.current?.offsetWidth ?? 0) - 6}
        >
          <>
            {Children.map(children, (child) => {
              if (isValidElement(child)) {
                return cloneElement(child as ReactElement<any>, {
                  onClick: (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
                    (child as ReactElement<any>).props.onClick &&
                      (child as ReactElement<any>).props.onClick(e);
                    setOpen(false);
                  },
                });
              }
              return null;
            })}
          </>
        </MenuList>
      )}
    </>
  );
};
