import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { render } from "../../test-utils";
import { SelectionCard } from "./SelectionCard";

it("renders Loading Pokemon text", () => {
  render(<SelectionCard />);
  const el = screen.getByText("Loading Pokemon");
  expect(el).toBeInTheDocument();
});
