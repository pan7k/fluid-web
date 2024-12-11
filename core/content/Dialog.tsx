import React, {
  FC,
  ReactNode,
  useState,
  MouseEvent,
  useRef,
  useEffect,
  useLayoutEffect,
} from "react";
import styled, { CSSObject } from "styled-components";
import { Theme } from "../theme/interfaces/theme";
import { EventProps } from "../common/interfaces";
import { IconButton } from "../buttons/IconButton";
import { Layer } from "../layout/Layer";
import { useDialogContext } from "./DialogContext";
import { Stack } from "../layout/Stack";

type ActionsAlign = "flex-start" | "space-between" | "flex-end";

interface SXProps {
  root?: CSSObject;
  header?: {
    root?: CSSObject;
    label?: CSSObject;
    buttons?: CSSObject;
  };
  actions?: CSSObject;
  content?: CSSObject;
  overlay?: CSSObject;
}

export interface DialogProps extends EventProps {
  children: ReactNode;
  label: ReactNode;
  actions?: Array<ReactNode>;
  actionsAlign?: ActionsAlign;
  fullscreen?: boolean;
  closable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  prominent?: boolean;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  width?: string;
  height?: string;
  active?: boolean;
  onClose?: () => void;
  sx?: SXProps;
}

interface BaseProps {
  theme: Theme;
  $active?: boolean;
  $draggable?: boolean;
  $resizable?: boolean;
  $maximized?: boolean;
  $prominent?: boolean;
  $align?: "flex-start" | "space-between" | "flex-end";
  $sx?: CSSObject;
}

const Overlay = styled.div<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.dialog?.overlay,
  ...$sx,
}));

const Base = styled.div<BaseProps>(
  ({ theme, $active, $resizable, $maximized, $sx }) => ({
    display: $active ? "block" : "none",
    resize: $resizable && !$maximized ? "both" : "none",
    ...theme.components?.dialog?.root,
    ...$sx,
  }),
);

const Header = styled.div<BaseProps>(
  ({ theme, $draggable, $maximized, $prominent, $sx }) => ({
    cursor: $draggable && !$maximized && !$prominent ? "move" : "default",
    ...theme.components?.dialog?.header?.root,
    ...$sx,
  }),
);

const Label = styled.div<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.dialog?.header?.label,
  ...$sx,
}));

const Content = styled.div<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.dialog?.content,
  ...$sx,
}));

const Actions = styled.div<BaseProps>(({ theme, $align, $sx }) => ({
  ...theme.components?.dialog?.actions,
  ...$sx,
  justifyContent: $align,
}));

const Buttons = styled.div<BaseProps>(({ theme, $sx }) => ({
  ...theme.components?.dialog?.header?.buttons,
  ...$sx,
}));

export const Dialog: FC<DialogProps> = ({
  children,
  label,
  actions,
  actionsAlign = "flex-end",
  closable = false,
  draggable = false,
  resizable = false,
  maximizable = false,
  minimizable = false,
  fullscreen = false,
  prominent,
  active = false,
  top,
  right,
  bottom,
  left,
  width,
  height,
  onClose,
  sx,
}) => {
  const dialogId = useRef(`dialog-${Math.random()}`).current;
  const dialogRef = useRef<HTMLDivElement>(null);

  const [isInitialized, setInitialized] = useState(false);
  const [isActive, setActive] = useState(active);
  const [isMinimized, setMinimized] = useState(false);
  const [isMaximized, setMaximized] = useState(false);
  const [isFullscreen, setFullscreen] = useState(fullscreen);
  const [isDragging, setDragging] = useState(false);
  const [isInitialPosition, setInitialPosition] = useState(true);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [prevPosition, setPrevPosition] = useState({
    top: top ? top : "0",
    right: right ? right : "0",
    bottom: bottom ? bottom : "0",
    left: left ? left : "0",
    width: width ? width : "auto",
    height: height ? height : "auto",
  });

  const { addMinimizedDialog } = useDialogContext();

  const centerDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    setPrevPosition({
      top: top
        ? top
        : `${innerHeight / 2 - dialog.getBoundingClientRect().height / 2}px`,
      right: right ? right : dialog.style.right,
      bottom: bottom ? bottom : dialog.style.bottom,
      left: left
        ? left
        : `${innerWidth / 2 - dialog.getBoundingClientRect().width / 2}px`,
      width: width ? width : dialog.style.width,
      height: height ? height : dialog.style.height,
    });
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    const dialog = dialogRef.current;
    if (!draggable || prominent || isMaximized || isFullscreen || !dialog)
      return;
    const rect = dialog.getBoundingClientRect();
    setDragging(true);
    setDragOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const dialog = dialogRef.current;
    if (!isDragging || isMaximized || isFullscreen || !dialog) return;
    dialog.style.top = `${event.clientY - dragOffset.y}px`;
    dialog.style.left = `${event.clientX - dragOffset.x}px`;
    dialog.style.bottom = "auto";
  };

  const handleMouseUp = () => {
    setDragging(false);
    const dialog = dialogRef.current;
    if (!dialog || isMaximized) return;
    setPrevPosition({
      top: dialog.style.top,
      right: dialog.style.right,
      bottom: dialog.style.bottom,
      left: dialog.style.left,
      width: dialog.style.width,
      height: dialog.style.height,
    });
    setInitialPosition(false);
  };

  const handleMaximize = () => {
    setMaximized(!isMaximized);
  };

  const handleMinimize = () => {
    const dialog = dialogRef.current;
    if (!isMinimized && dialog) {
      setActive(false);
      setMinimized(true);
      addMinimizedDialog({
        id: dialogId,
        label,
        restore: () => {
          setMinimized(false);
          setActive(true);
        },
      });
    }
  };

  // TODO: Refactor
  const handleFullscreen = () => {
    setFullscreen(!isFullscreen);
    if (dialogRef.current && !isFullscreen) {
      dialogRef.current.style.top = "0";
      dialogRef.current.style.right = "0";
      dialogRef.current.style.bottom = "0";
      dialogRef.current.style.left = "0";
      dialogRef.current.style.width = "100vw";
      dialogRef.current.style.height = "100vh";
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    centerDialog();
    setInitialPosition(true);
  };

  // updates the active state when the prop changes
  useEffect(() => {
    setActive(active);
    if (!active) {
      setMaximized(false);
    }
  }, [active]);

  // centers the dialog when it is first rendered
  useLayoutEffect(() => {
    if (active && !isInitialized) {
      centerDialog();
      setInitialized(true);
    }
  }, [isActive, isInitialized]);

  // TODO: Refactor; toggles the fullscreen state when the prop changes
  useEffect(() => {
    if (fullscreen !== isFullscreen) {
      handleFullscreen();
    }
  }, [fullscreen]);

  // updates the dialog position when it is restored from the minimized state
  useEffect(() => {
    const dialog = dialogRef.current;
    if (isInitialized && !isMinimized && isActive && dialog) {
      if (isMaximized) {
        dialog.style.top = "0";
        dialog.style.right = "0";
        dialog.style.bottom = "0";
        dialog.style.left = "0";
        dialog.style.width = "100vw";
        dialog.style.height = "100vh";
      } else {
        dialog.style.top = prevPosition.top;
        dialog.style.right = prevPosition.right;
        dialog.style.bottom = prevPosition.bottom;
        dialog.style.left = prevPosition.left;
        dialog.style.width = prevPosition.width;
        dialog.style.height = prevPosition.height;
      }
    }
  }, [isMinimized, isMaximized, isActive, isInitialized]);

  // aligns the dialog on window resize
  useEffect(() => {
    if (
      !isInitialPosition ||
      (isInitialPosition && !top && !right && !bottom && !left)
    ) {
      const initialWindowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const handleResize = () => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const deltaX = (window.innerWidth - initialWindowSize.width) / 2;
        const deltaY = (window.innerHeight - initialWindowSize.height) / 2;

        const newTop = `${parseFloat(prevPosition.top) + deltaY}px`;
        const newLeft = `${parseFloat(prevPosition.left) + deltaX}px`;

        setPrevPosition((prev) => ({
          ...prev,
          top: newTop,
          left: newLeft,
        }));

        dialog.style.top = newTop;
        dialog.style.left = newLeft;
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [prevPosition, dialogRef, isInitialPosition]);

  if (!isActive) return null;

  return (
    <>
      {isActive && prominent && <Overlay $sx={sx?.overlay} />}
      <Base
        ref={dialogRef}
        $active={isActive}
        $draggable={draggable}
        $resizable={resizable}
        $maximized={isMaximized}
        $sx={sx?.root}
      >
        <Header
          $draggable={draggable}
          $maximized={isMaximized}
          $prominent={prominent}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          $sx={sx?.header}
        >
          <Label>{label}</Label>
          <Buttons $sx={sx?.header?.buttons}>
            {minimizable && !prominent && (
              <IconButton
                icon="minus"
                variant="light"
                color="secondary"
                onClick={handleMinimize}
              />
            )}
            {maximizable && !prominent && (
              <IconButton
                icon={isMaximized ? "cornersOut" : "square"}
                variant="light"
                color="secondary"
                onClick={handleMaximize}
              />
            )}
            {closable && (
              <IconButton
                icon="x"
                variant="light"
                color="secondary"
                onClick={handleClose}
              />
            )}
          </Buttons>
        </Header>
        <Layer
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            marginTop: 0,
            paddingTop: 0,
            paddingBottom: "16px",
          }}
        >
          <Stack sx={{ flexGrow: 1 }}>
            <Content $sx={sx?.content}>{children}</Content>
            {actions && (
              <Actions $align={actionsAlign} $sx={sx?.actions}>
                {actions.map((action, index) => (
                  <div key={index}>{action}</div>
                ))}
              </Actions>
            )}
          </Stack>
        </Layer>
      </Base>
    </>
  );
};
