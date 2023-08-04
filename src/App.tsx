import { ChakraProvider, theme } from "@chakra-ui/react";
import { Layout } from "./components/layout/Layout";
import { FavoritesContextProvider } from "./context/FavoritesContext";
import { SelectionContextProvider } from "./context/SelectionContext";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <FavoritesContextProvider>
        <SelectionContextProvider>
          <Layout />
        </SelectionContextProvider>
      </FavoritesContextProvider>
    </ChakraProvider>
  );
};
