import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { FavoritesContextProvider } from "./context/FavoritesContext";
import { SelectionContextProvider } from "./context/SelectionContext";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <FavoritesContextProvider>
    <SelectionContextProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SelectionContextProvider>
  </FavoritesContextProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
