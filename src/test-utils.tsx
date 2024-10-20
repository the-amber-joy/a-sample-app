import { ChakraProvider, theme } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import * as React from "react";
import { SelectionContextProvider } from "./context/SelectionContext";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <SelectionContextProvider>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </SelectionContextProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
