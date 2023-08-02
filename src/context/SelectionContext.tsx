import { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/Pokemon";

interface SelectionContextType {
  selection: Pokemon | null;
  updateSelection: (newSelection: Pokemon) => void;
}

export const SelectionContext = createContext<SelectionContextType | null>(null);

export const useSelectionContext = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error(
      "useSelectionContext must be used within a SelectionContextProvider"
    );
  }
  return context;
};

export const SelectionContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<Pokemon | null>(null);

  const updateSelection = (newState: Pokemon) => {
    setState(newState);
  };

  return (
    <SelectionContext.Provider value={{ selection: state, updateSelection }}>
      {children}
    </SelectionContext.Provider>
  );
};
