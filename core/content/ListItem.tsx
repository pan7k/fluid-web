import React, { FC, ReactNode, useState, KeyboardEvent, useMemo } from "react";
import { sx } from "../theme/utils/sx";
import { Icon, IconSymbol } from "../icons/Icon";

export interface ListItemProps {
  children: ReactNode;
  classes?: string;
  onClick?: () => void;
  icon?: IconSymbol;
  iconPosition?: "start" | "end";
  nestedItems?: ReactNode[];
  id?: string;
  actionButton?: ReactNode;
  actionButtonPosition?: "start" | "end";
}

export const ListItem: FC<ListItemProps> = ({
  children,
  classes = "",
  onClick,
  icon,
  iconPosition = "start",
  nestedItems,
  id,
  actionButton,
  actionButtonPosition = "end",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasNestedItems = Array.isArray(nestedItems) && nestedItems.length > 0;

  const itemId = useMemo(
    () => id || `list-item-${Math.random().toString(36).substring(2, 9)}`,
    [id],
  );
  const nestedListId = `${itemId}-nested-list`;

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (hasNestedItems) {
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (hasNestedItems) {
      handleToggle(e);
    } else if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (hasNestedItems) {
        handleToggle(e);
      } else if (onClick) {
        e.stopPropagation();
        onClick();
      }
    }
  };

  const handleActionButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <li
        id={itemId}
        className={sx(
          `listItem flex items-center`,
          hasNestedItems ? "cursor-pointer" : "",
          classes,
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={hasNestedItems ? "treeitem" : "listitem"}
        aria-expanded={hasNestedItems ? isOpen : undefined}
        aria-controls={hasNestedItems ? nestedListId : undefined}
        aria-haspopup={hasNestedItems ? "true" : undefined}
        tabIndex={0}
      >
        {actionButton && actionButtonPosition === "start" && (
          <div
            className="mr-2"
            onClick={handleActionButtonClick}
            aria-label="Action button"
          >
            {actionButton}
          </div>
        )}

        {icon && iconPosition === "start" && (
          <Icon symbol={icon} size="sm" classes="mr-2" aria-hidden="true" />
        )}

        <span className="flex-grow">{children}</span>

        {icon && iconPosition === "end" && !hasNestedItems && (
          <Icon symbol={icon} size="sm" classes="ml-2" aria-hidden="true" />
        )}

        {actionButton && actionButtonPosition === "end" && (
          <div
            className="ml-2"
            onClick={handleActionButtonClick}
            aria-label="Action button"
          >
            {actionButton}
          </div>
        )}

        {hasNestedItems && (
          <Icon
            symbol="caret-down"
            size="sm"
            classes={sx(
              "ml-2 transition-transform",
              isOpen ? "rotate-180" : "",
            )}
            aria-hidden="true"
          />
        )}
      </li>

      {hasNestedItems && (
        <ul
          id={nestedListId}
          className={sx("pl-6 mt-1", !isOpen ? "hidden" : "")}
          role="group"
          aria-labelledby={itemId}
        >
          {isOpen &&
            nestedItems.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
        </ul>
      )}
    </>
  );
};
