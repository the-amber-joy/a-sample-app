import { ChakraProvider, theme } from "@chakra-ui/react";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Layout />
    </ChakraProvider>
  );
};
