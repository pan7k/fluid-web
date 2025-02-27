import React, {
  FC,
  ReactNode,
  useState,
  MouseEvent,
  useRef,
  useEffect,
  useLayoutEffect,
  HTMLAttributes,
} from "react";
import { IconButton } from "../buttons/IconButton";
import { Layer } from "../layout/Layer";
import { useDialogContext } from "./DialogContext";
import { Stack } from "../layout/Stack";
import { sx } from "../theme/utils/sx";
import { Theme } from "../theme/interfaces";

type ActionsAlign = "flex-start" | "space-between" | "flex-end";

export interface DialogProps extends HTMLAttributes<HTMLDialogElement> {
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
  noPadding?: boolean;
  active?: boolean;
  onClose?: () => void;
  classes?: Theme["dialog"];
}

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
  noPadding,
  top,
  right,
  bottom,
  left,
  width,
  height,
  onClose,
  classes,
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

  const { bringDialogToFront, getDialogZIndex, addMinimizedDialog } =
    useDialogContext();

  const bringToFront = () => {
    bringDialogToFront(dialogId);
  };

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

  // toggles the fullscreen state when the prop changes
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
      {isActive && prominent && (
        <div className={sx("dialog-overlay", classes?.overlay)} />
      )}
      <div
        ref={dialogRef}
        onMouseDown={bringToFront}
        style={{
          display: active ? "block" : "none",
          resize: resizable && !isMaximized ? "both" : "none",
          zIndex: getDialogZIndex(dialogId),
        }}
        className={sx("dialog", classes?.dialog)}
      >
        <div
          className={sx(
            "dialog-header",
            classes?.header,
            noPadding ? "" : "mb-[3px]",
          )}
          style={{
            cursor:
              draggable && !isMaximized && !prominent ? "move" : "default",
          }}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div className={sx("dialog-label", classes?.label)}>{label}</div>
          <div className={sx("dialog-buttons", classes?.buttons)}>
            {minimizable && !prominent && (
              <IconButton
                icon="minus"
                variant="light"
                color="secondary"
                onClick={handleMinimize}
                classes={classes?.iconButton}
              />
            )}
            {maximizable && !prominent && (
              <IconButton
                icon={isMaximized ? "cornersOut" : "square"}
                variant="light"
                color="secondary"
                onClick={handleMaximize}
                classes={classes?.iconButton}
              />
            )}
            {closable && (
              <IconButton
                icon="x"
                variant="light"
                color="secondary"
                onClick={handleClose}
                classes={classes?.iconButton}
              />
            )}
          </div>
        </div>
        <Layer
          classes={`dialog-layer ${classes?.layer ? classes.layer : ""} ${!fullscreen && resizable && !width && !height ? "resize min-w-[320px] min-h-[100px]" : ""} ${noPadding ? "!p-0 !m-0" : ""} ${isMaximized ? "fixed w-full" : ""}`}
          style={{ height: isMaximized ? "calc(100vh - 54px)" : height }}
        >
          <Stack classes={`flex-grow ${classes?.stack ? classes?.stack : {}}`}>
            <div
              className={sx(
                "dialog-content",
                isMaximized ? "w-full" : "",
                classes?.content,
              )}
            >
              {children}
            </div>
            {actions && (
              <div
                className={sx("dialog-actions", classes?.actions)}
                style={{ justifyContent: actionsAlign }}
              >
                {actions.map((action, index) => (
                  <div key={index}>{action}</div>
                ))}
              </div>
            )}
          </Stack>
        </Layer>
      </div>
    </>
  );
};
