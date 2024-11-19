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
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined);

export const DialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [minimizedDialogs, setMinimizedDialogs] = useState<MinimizedDialog[]>(
    [],
  );

  const addMinimizedDialog = (dialog: MinimizedDialog) => {
    setMinimizedDialogs((prev) => [...prev, dialog]);
  };

  const removeMinimizedDialog = (id: string) => {
    setMinimizedDialogs((prev) => prev.filter((dialog) => dialog.id !== id));
  };

  return (
    <DialogContext.Provider
      value={{ minimizedDialogs, addMinimizedDialog, removeMinimizedDialog }}
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
