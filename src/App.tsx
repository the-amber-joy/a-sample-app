import { ChakraProvider, theme } from "@chakra-ui/react";
import { Layout } from "./components/layout/Layout";
import { SelectionContextProvider } from "./context/SelectionContext";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <SelectionContextProvider>
        <Layout />
      </SelectionContextProvider>
      </ChakraProvider>
  );
};
