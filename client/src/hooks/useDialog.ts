import { DialogContextType } from "@/types/dialog";
import { createContext, useContext } from "react";

export const DialogContext = createContext<DialogContextType | undefined>(
  undefined
);

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used within DialogProvider");
  return ctx;
};
