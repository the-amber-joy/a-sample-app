import { Box, Flex, Stack } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Favorites } from "./Favorites";
import { SearchComponent } from "./SearchComponent";
import { SelectionCard } from "./SelectionCard/SelectionCard";

export const Layout = () => (
  <Box as="main" textAlign="center" fontSize="xl" minHeight="100vh" maxWidth="1280px">
    <ColorModeSwitcher />
    <Flex p={4} w="100%" direction={{ base: "column", lg: "row" }}>
      <Stack
        direction={{ base: "column", lg: "row" }}
        justify="center"
        spacing={3}
      >
        <SearchComponent />
        <SelectionCard />
        <Favorites />
      </Stack>
    </Flex>
  </Box>
);
