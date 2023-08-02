import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { filter } from "lodash";
import { useFavoritesContext } from "../context/FavoritesContext";
import { useSelectionContext } from "../context/SelectionContext";
import { isFavorite } from "../util";

export const StarBtn = () => {
  const { selection } = useSelectionContext();

  const { favorites, updateFavorites } = useFavoritesContext();
  const isFave = selection && isFavorite(favorites, selection.id);
  return (
    <Button
      variant={isFave ? "solid" : "outline"}
      colorScheme="yellow"
      onClick={() => {
        if (selection) {
          if (isFave) {
            const newList = filter(
              favorites,
              (fave) => fave.id !== selection.id
            );
            updateFavorites(newList);
          } else {
            updateFavorites([...favorites, selection]);
          }
        }
      }}
    >
      <StarIcon />
    </Button>
  );
};
