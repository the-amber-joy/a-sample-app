import { Button } from "@chakra-ui/react";
import { useFavoritesContext } from "../context/FavoritesContext";
import { isFavorite } from "../util";
import { StarIcon } from "@chakra-ui/icons";
import { Pokemon } from "../types/Pokemon";
import { filter } from "lodash";

export const FaveBtn = ({ selectedPokemon }: { selectedPokemon: Pokemon }) => {
  const { favorites, updateFavorites } = useFavoritesContext();
  const isFave = isFavorite(favorites, selectedPokemon.id);
  return (
    <Button
      variant={isFave ? "solid" : "outline"}
      colorScheme="yellow"
      onClick={() => {
        if (isFave) {
          const newList = filter(
            favorites,
            (fave) => fave.id !== selectedPokemon.id
          );
          updateFavorites(newList);
        } else {
          updateFavorites([...favorites, selectedPokemon]);
        }
      }}
    >
      <StarIcon />
    </Button>
  );
};
