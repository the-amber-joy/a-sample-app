import { Box, SimpleGrid } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { Favorites } from "../favorites/Favorites";
import { PokemonCard } from "../pokemonCard/PokemonCard";
import { SearchComponent } from "../search/SearchComponent";

export const Layout = () => (
  <Box textAlign="center" fontSize="xl">
    <ColorModeSwitcher />
    <SimpleGrid minChildWidth="md" spacing={1} w="100vw" alignItems="center">
      <SearchComponent />
      <PokemonCard />
      <Favorites />
    </SimpleGrid>
  </Box>
);
