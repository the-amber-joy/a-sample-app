import { ChakraProvider, theme } from "@chakra-ui/react";
import { FavoritesContextProvider } from "./context/FavoritesContext";
import { SelectionContextProvider } from "./context/SelectionContext";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <FavoritesContextProvider>
      <SelectionContextProvider>
        <ChakraProvider theme={theme}>
          <Layout />
        </ChakraProvider>
      </SelectionContextProvider>
    </FavoritesContextProvider>
  );
};
