import { filter } from "lodash";
import { create } from "zustand";
import { Pokemon } from "../types/Pokemon";

function getFavorites() {
  if (localStorage.getItem("favorites")) {
    const storedFavorites = localStorage.getItem("favorites") as string;
    return JSON.parse(storedFavorites) as Pokemon[];
  }

  return [] as Pokemon[];
}

interface FavoritesState {
  favorites: Pokemon[];
  updateFavorites: (selection: Pokemon, isFave: boolean) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: getFavorites(),
  updateFavorites: (selection: Pokemon, isFave: boolean) => {
    if (isFave) {
      const newList = filter(
        getFavorites(),
        (fave) => fave.id !== selection.id,
      );
      set((state) => ({ favorites: newList }));
      localStorage.setItem("favorites", JSON.stringify(newList));
    } else {
      set((state) => ({ favorites: [...state.favorites, selection] }));
      localStorage.setItem(
        "favorites",
        JSON.stringify([...getFavorites(), selection]),
      );
    }
  },
}));
