import { map } from "lodash";
import { Heading, Stack, VStack } from "@chakra-ui/react";
import { FavoriteCard } from "./FavoriteCard";
import { useFavoritesContext } from "../context/FavoritesContext";

export const Favorites = () => {
  const { favorites } = useFavoritesContext();

  return (
    <VStack>
      <Heading>Favorites</Heading>
        <Stack spacing={1} h="lg" w="auto" overflowY="auto">
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
        </Stack>
    </VStack>
  );
};
