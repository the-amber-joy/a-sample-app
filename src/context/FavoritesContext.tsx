import { createContext, useContext, useState } from "react";
import { Pokemon } from "../types/Pokemon";

interface FavoritesContextType {
  favorites: Pokemon[];
  updateFavorites: (newList: Pokemon[]) => void;
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
  const [state, setState] = useState<Pokemon[]>([]);

  const updateFavorites = (newState: Pokemon[]) => {
    setState(newState);
  };


  return (
    <FavoritesContext.Provider value={{ favorites: state, updateFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
