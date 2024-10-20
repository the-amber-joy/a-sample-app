import { StarIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useFavoritesStore } from "../../stores/favoritesStore";
import { Pokemon } from "../../types/Pokemon";
import { isFavorite } from "./isFavorite";

interface StarBtnProps extends ButtonProps {
  selection: Pokemon | null;
}

export const StarBtn = (props: StarBtnProps) => {
  const { selection } = props;
  const { favorites, updateFavorites } = useFavoritesStore();
  const isFave = selection ? isFavorite(favorites, selection.id) : false;

  return (
    <Button
      aria-label="Save this Pokemon as a Favorite"
      variant={isFave ? "solid" : "outline"}
      colorScheme="yellow"
      onClick={() => {
        if (selection) {
          updateFavorites(selection, isFave);
        }
      }}
      {...props}
    >
      <StarIcon />
    </Button>
  );
};
