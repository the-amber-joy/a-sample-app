import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { render } from "../../../test-utils";
import { PokemonCard } from "./PokemonCard";

function renderComponent({
  selection,
  description = "",
  headingText = "",
  isLoading = false,
  isShiny = false,
}: {
  selection?: any;
  description?: string;
  headingText?: string;
  isLoading?: boolean;
  isShiny?: boolean;
}) {
  render(
    <PokemonCard
      description={description}
      headingText={headingText}
      isLoading={isLoading}
      isShiny={isShiny}
      selection={selection}
      setIsLoading={undefined}
      setIsShiny={undefined}
      updateSelection={undefined}
    />,
  );
}

describe("PokemonCard", () => {
  it("renders a loading indicator if isLoading is true", () => {
    renderComponent({ isLoading: true });
    const el = screen.getByText("Loading...");
    expect(el).toBeInTheDocument();
  });

  it("renders the correct heading text", () => {
    renderComponent({ headingText: "This is a pokemon" });
    const el = screen.getByText("This is a pokemon");
    expect(el).toBeInTheDocument();
  });

  it("renders the description", () => {
    renderComponent({
      description: "A description",
      selection: {
        id: 42,
        name: "pikachu",
      },
    });
    const el = screen.getByText("A description");
    expect(el).toBeInTheDocument();
  });

  it("renders the pokemon name and ID as the heading", () => {
    renderComponent({
      selection: {
        id: 42,
        name: "pikachu",
      },
    });
    const el = screen.getByText(`Pikachu # 0042`);
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("H2");
  });

  it("renders the shiny button when default is selected", () => {
    renderComponent({
      selection: {
        id: 42,
        name: "pikachu",
      },
    });
    const el = screen.getByText("Make it Shiny!");
    expect(el).toBeInTheDocument();
  });

  it("renders the normal button when shiny is selected", () => {
    renderComponent({
      selection: {
        id: 42,
        name: "pikachu",
      },
      isShiny: true,
    });
    const el = screen.getByText("Make it Default");
    expect(el).toBeInTheDocument();
  });
});
