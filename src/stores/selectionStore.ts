import { create } from "zustand";
import { Pokemon } from "../types/Pokemon";

interface SelectionState {
  selection: Pokemon | null;
  updateSelection: (newSelection: Pokemon) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selection: null,
  updateSelection: (newSelection: Pokemon) => {
    set({ selection: newSelection });
  },
}));
