import React, {
  FC,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { Icon, IconSymbol, IconVariant } from "../icons/Icon";
import { EventProps } from "../common/interfaces";
import { Text } from "../typography/Text";

type AccordionSize = "xs" | "sm" | "md";

interface SXProps {
  root?: CSSObject;
  panel?: CSSObject;
  icon?: CSSObject;
  content?: CSSObject;
  opened?: {
    root?: CSSObject;
    panel?: CSSObject;
    icon?: CSSObject;
    content?: CSSObject;
  };
}

export interface AccordionProps extends EventProps {
  children: ReactNode;
  label: ReactNode;
  icon?: IconSymbol;
  iconVariant?: IconVariant;
  expanded?: boolean;
  expandable?: boolean;
  size?: AccordionSize;
  sx?: SXProps;
}

interface BaseProps {
  theme: Theme;
  $open: boolean;
  $size?: AccordionSize;
  $sx?: CSSObject;
}

const Base = styled.div<BaseProps>(({ theme, $open, $sx }) => ({
  ...theme.components?.accordion?.root,
  ...($open ? theme.components?.accordion?.opened?.root : {}),
  ...$sx,
}));

const Panel = styled.div<BaseProps>(({ theme, $open, $size = "md", $sx }) => ({
  ...theme.components?.accordion?.panel,
  ...($open ? theme.components?.accordion?.opened?.panel : {}),
  ...theme.components?.accordion?.size?.[$size],
  ...$sx,
}));

const Content = styled.div<BaseProps>(({ theme, $open, $sx }) => ({
  ...theme.components?.accordion?.content,
  ...($open ? theme.components?.accordion?.opened?.content : {}),
  ...$sx,
}));

const IconBase = styled.div<BaseProps>(({ theme, $open, $sx }) => ({
  height: "auto",
  ...theme.components?.accordion?.icon,
  ...($open ? theme.components?.accordion?.opened?.icon : {}),
  ...$sx,
}));

export const Accordion: FC<AccordionProps> = ({
  children,
  label,
  icon,
  iconVariant,
  expanded = false,
  expandable = true,
  onClick,
  size = "md",
  sx,
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
    <Base $open={open} $sx={{ ...sx?.root, ...(open ? sx?.opened?.root : {}) }}>
      <Panel
        onClick={handleChange}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-expanded={open}
        $open={open}
        $size={size}
        $sx={{ ...sx?.panel, ...(open ? sx?.opened?.panel : {}) }}
      >
        {typeof label === "string" ? <Text>{label}</Text> : label}
        {icon ? (
          <IconBase
            $open={open}
            $sx={{ ...sx?.icon, ...(open ? sx?.opened?.icon : {}) }}
          >
            <Icon symbol={icon} variant={iconVariant} size="xs" />
          </IconBase>
        ) : (
          <IconBase
            $open={open}
            $sx={{ ...sx?.icon, ...(open ? sx?.opened?.icon : {}) }}
          >
            <Icon symbol={open ? "caretUp" : "caretDown"} size="xs" />
          </IconBase>
        )}
      </Panel>
      {expandable && (
        <Content
          $open={open}
          $sx={{ ...sx?.content, ...(open ? sx?.opened?.content : {}) }}
        >
          {children}
        </Content>
      )}
    </Base>
  );
};
