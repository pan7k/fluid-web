import React, {
  FC,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { Text } from "../typography/Text";
import { sx } from "../theme/utils/sx";
import { Theme } from "../theme/interfaces";

type AccordionSize = "xs" | "sm" | "md";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  label: ReactNode;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  expanded?: boolean;
  expandable?: boolean;
  size?: AccordionSize;
  classes?: Theme["accordion"];
  actions?: ReactNode;
}

export const Accordion: FC<AccordionProps> = ({
  children,
  label,
  icon,
  iconVariant,
  expanded = false,
  expandable = true,
  onClick,
  size = "md",
  classes,
  actions,
}) => {
  const [open, setOpen] = useState(expanded);

  useEffect(() => {
    if (!expandable) {
      setOpen(false);
    } else {
      setOpen(expanded);
    }
  }, [setOpen, expanded, expandable]);

  const handleChange = useCallback(
    (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
      if ((event.target as HTMLElement).closest(".accordion-right")) {
        return;
      }

      onClick && onClick(event as any);
      if (expandable) {
        setOpen(!open);
      }
    },
    [open, expandable, onClick],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        handleChange(event);
      }
    },
    [handleChange],
  );

  return (
    <div className={sx(classes?.stack)}>
      <div
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-expanded={open}
        className={sx(
          `accordion-panel accordion-${size}`,
          { "accordion-panel-opened": open },
          classes?.accordion,
        )}
      >
        <div className="accordion-left">
          {icon ? (
            <div
              className={sx("accordion-icon", {
                "accordion-icon-opened": open,
              })}
            >
              <Icon
                symbol={icon}
                variant={iconVariant}
                size="xs"
                classes={classes?.icon}
              />
            </div>
          ) : (
            <div
              className={sx("accordion-icon", {
                "accordion-icon-opened": open,
              })}
            >
              <Icon
                symbol={open ? "caretUp" : "caretDown"}
                size="xs"
                classes={classes?.icon}
              />
            </div>
          )}
          {typeof label === "string" ? <Text>{label}</Text> : label}
        </div>
        {actions && (
          <div
            className="accordion-right"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => {
              if (e.button !== 0) return;
              e.preventDefault();
            }}
            onKeyDown={(e) => {
              if (
                (e.key === " " || e.key === "Enter") &&
                e.target instanceof HTMLButtonElement
              ) {
                e.preventDefault();
                e.target.click();
              }
            }}
          >
            {React.Children.map(actions, (child) =>
              React.isValidElement<{ onClick?: (event: MouseEvent) => void }>(
                child,
              )
                ? React.cloneElement(child, {
                    onClick: (event: MouseEvent) => {
                      event.stopPropagation();
                      child.props.onClick?.(event);
                    },
                  })
                : child,
            )}
          </div>
        )}
      </div>
      {expandable && (
        <div
          className={sx(
            "accordion-content",
            {
              "accordion-content-opened": open,
            },
            classes?.content,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
