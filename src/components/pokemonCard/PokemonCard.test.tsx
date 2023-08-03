import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "../../test-utils";
import { PokemonCard } from "./PokemonCard";

it("renders Loading Pokemon text", () => {
  render(<PokemonCard />);
  const el = screen.getByText("Loading Pokemon");
  expect(el).toBeInTheDocument();
});
