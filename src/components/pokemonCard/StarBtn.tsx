import { StarIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { filter } from "lodash";
import { useFavoritesContext } from "../../context/FavoritesContext";
import { isFavorite } from "../../util";
import { Pokemon } from "../../types/Pokemon";

interface StarBtnProps extends ButtonProps {
  selection: Pokemon | null;
}

export const StarBtn = (props: StarBtnProps) => {
  const { selection } = props;
  const { favorites, updateFavorites } = useFavoritesContext();
  const isFave = selection && isFavorite(favorites, selection.id);
  return (
    <Button
      aria-label="Save this Pokemon as a Favorite"
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
      {...props}
    >
      <StarIcon />
    </Button>
  );
};
