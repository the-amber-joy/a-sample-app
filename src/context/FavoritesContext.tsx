import { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/Pokemon";

interface FavoritesContextType {
  favorites: Pokemon[];
  updateFavorites: (newList: Pokemon[]) => void;
}

function getFavorites() {
  if (localStorage.getItem("favorites")) {
    const storedFavorites = localStorage.getItem("favorites") as string;
    return JSON.parse(storedFavorites) as Pokemon[];
  }

  return [];
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  updateFavorites: () => {},
});

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesContextProvider"
    );
  }
  return context;
};

export const FavoritesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<Pokemon[]>(getFavorites());

  const updateFavorites = (newState: Pokemon[]) => {
    setState(newState);
    localStorage.setItem("favorites", JSON.stringify(newState));
  };

  return (
    <FavoritesContext.Provider value={{ favorites: state, updateFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
