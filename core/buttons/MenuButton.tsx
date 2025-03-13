import React, { FC, ReactElement, RefObject, useRef, useState } from "react";
import { Button, ButtonProps } from "./Button";
import { IconButton } from "./IconButton";
import { sx } from "../theme/utils/sx";
import { MenuDirection, MenuList } from "../menus/MenuList";

export interface MenuButtonProps
  extends Omit<ButtonProps, "label" | "size" | "classes"> {
  label?: string;
  children: ReactElement | ReactElement[];
  size?: "xs" | "sm" | "md";
  combined?: boolean;
  menuDirection?: MenuDirection;
}

export const MenuButton: FC<MenuButtonProps> = ({
  children,
  label,
  icon,
  combined,
  menuDirection,
  onClick,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    buttonRef.current?.focus();
  };

  return (
    <>
      {!combined ? (
        label ? (
          <Button
            label={label}
            icon={icon || (open ? "caret-up" : "caret-down")}
            onClick={toggleMenu}
            ref={buttonRef}
            {...rest}
          />
        ) : (
          <IconButton
            icon={icon || (open ? "caret-up" : "caret-down")}
            onClick={toggleMenu}
            ref={buttonRef}
            {...rest}
          />
        )
      ) : (
        <div className={sx("menuButton-stack")}>
          {label && <Button label={label} onClick={onClick} {...rest} />}
          <IconButton
            icon={icon || (open ? "caret-up" : "caret-down")}
            onClick={toggleMenu}
            ref={buttonRef}
            {...rest}
          />
        </div>
      )}
      {open && buttonRef.current && (
        <MenuList
          parentRef={buttonRef as RefObject<HTMLButtonElement>}
          direction={menuDirection}
          onClose={() => setOpen(false)}
          offset={4}
        >
          {React.Children.map(children, (child) =>
            React.isValidElement(child) ? React.cloneElement(child) : child,
          )}
        </MenuList>
      )}
    </>
  );
};
