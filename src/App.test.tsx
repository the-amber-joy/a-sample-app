import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { render } from "./test-utils";
import { App } from "./App";

test("renders Loading Pokemon text initially", () => {
  render(<App />);
  const el = screen.getByText("Loading Pokemon");
  expect(el).toBeInTheDocument();
});
