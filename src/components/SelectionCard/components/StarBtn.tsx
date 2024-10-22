import { StarIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { some } from "lodash";
import { useFavoritesStore } from "../../../stores/favoritesStore";
import { Pokemon } from "../../../types/Pokemon";

interface StarBtnProps extends ButtonProps {
  selection: Pokemon | null;
}

export const isFavorite = (
  favorites: { id: number; name: string }[],
  id: number,
) => {
  return some(favorites, { id });
};

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
