import { Box, ChakraProvider, Grid, GridItem, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Favorites } from "./components/Favorites";
import { PokemonCard } from "./components/PokemonCard";
import { FavoritesContextProvider } from "./context/FavoritesContext";
import { SelectionContextProvider } from "./context/SelectionContext";

export const App = () => {
  return (
    <FavoritesContextProvider>
      <SelectionContextProvider>
        <ChakraProvider theme={theme}>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={10}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem colSpan={1}>
                  <Favorites />
                </GridItem>
                <GridItem colSpan={2}>
                  <PokemonCard />
                </GridItem>
              </Grid>
            </Grid>
          </Box>
        </ChakraProvider>
      </SelectionContextProvider>
    </FavoritesContextProvider>
  );
};
