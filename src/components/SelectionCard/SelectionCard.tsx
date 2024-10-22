import { sample } from "lodash";
import { useEffect, useState } from "react";
import fetchPokemon from "../../functions/fetchPokemon";
import { useSelectionStore } from "../../stores/selectionStore";
import { PokemonCard } from "./components/PokemonCard";

export const SelectionCard = () => {
  const { selection, updateSelection } = useSelectionStore();
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [headingText, setHeadingText] = useState<string>("Loading Pokemon");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    fetchPokemon({
      setIsLoading,
      updateSelection,
    });
  }, [updateSelection]);

  useEffect(() => {
    if (!isLoading && selection) {
      if (selection?.isRandom) {
        setHeadingText("This is a random Pokemon");
      }
      if (!selection?.isRandom) {
        setHeadingText("This is your Pokemon");
      }
      const randomDescription = sample(selection.descriptions) || "";
      setDescription(randomDescription);
    }
  }, [isLoading, selection]);

  return (
    <PokemonCard
      headingText={headingText}
      description={description}
      isLoading={isLoading}
      isShiny={isShiny}
      selection={selection}
      setIsLoading={setIsLoading}
      setIsShiny={setIsShiny}
      updateSelection={updateSelection}
    />
  );
};
