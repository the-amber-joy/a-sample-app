import { Heading, Stack, VStack } from "@chakra-ui/react";
import { map } from "lodash";
import { useFavorites } from "../../store";
import { FavoriteCard } from "./FavoriteCard";

export const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <VStack w={"auto"} minW={"sm"}>
      <Heading>Favorites</Heading>
      <Stack spacing={1} h="lg" w="auto" alignContent="center" overflowY="auto">
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
