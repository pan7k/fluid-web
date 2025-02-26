import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

interface MinimizedDialog {
  id: string;
  label: ReactNode;
  restore: () => void;
}

interface DialogContextProps {
  minimizedDialogs: MinimizedDialog[];
  addMinimizedDialog: (dialog: MinimizedDialog) => void;
  removeMinimizedDialog: (id: string) => void;
  bringDialogToFront: (id: string) => void;
  getDialogZIndex: (id: string) => number;
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [minimizedDialogs, setMinimizedDialogs] = useState<MinimizedDialog[]>(
    [],
  );
  const [dialogOrder, setDialogOrder] = useState<string[]>([]);

  const addMinimizedDialog = (dialog: MinimizedDialog) => {
    setMinimizedDialogs((prev) => [...prev, dialog]);
  };

  const removeMinimizedDialog = (id: string) => {
    setMinimizedDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
    bringDialogToFront(id);
  };

  const bringDialogToFront = (id: string) => {
    setDialogOrder((prev) => [
      ...prev.filter((dialogId) => dialogId !== id),
      id,
    ]);
  };

  const getDialogZIndex = (id: string) => {
    const baseZIndex = 1000;
    const index = dialogOrder.indexOf(id);
    return index === -1 ? baseZIndex : baseZIndex + index;
  };

  return (
    <DialogContext.Provider
      value={{
        minimizedDialogs,
        addMinimizedDialog,
        removeMinimizedDialog,
        bringDialogToFront,
        getDialogZIndex,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a DialogProvider");
  }
  return context;
};
