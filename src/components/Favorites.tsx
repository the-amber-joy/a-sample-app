import { map } from "lodash";
import { Heading, VStack } from "@chakra-ui/react";
import { FavoriteCard } from "./FavoriteCard";
import { useFavoritesContext } from "../context/FavoritesContext";

export const Favorites = () => {
  const { favorites } = useFavoritesContext();

  return (
    <VStack>
      <Heading>Favorites</Heading>
      {map(favorites, (favorite) => {
        return (
          <FavoriteCard
            name={favorite.name}
            id={favorite.id}
            spriteIcon={favorite.spriteIcon}
            key={favorite.id}
          />
        );
      })}
    </VStack>
  );
};
