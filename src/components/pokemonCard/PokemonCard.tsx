import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Divider,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { sample } from "lodash";
import { useEffect, useState } from "react";
import fetchPokemon from "../../functions/fetchPokemon";
import { useSelectionStore } from "../../stores/selectionStore";
import { CardContents } from "./components/CardContents";
import { FooterContents } from "./components/FooterContents";

export const PokemonCard = () => {
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
    <Card w={{ base: "auto", lg: "md" }} minHeight="xl">
      <CardHeader>
        <Heading size="md">{headingText}</Heading>
      </CardHeader>
      {isLoading && (
        <CardBody>
          <Center>
            <Spinner size="xl" />
          </Center>
        </CardBody>
      )}
      {!isLoading && (
        <CardContents
          description={description}
          isShiny={isShiny}
          selection={selection}
        />
      )}
      <Divider />
      <FooterContents
        isLoading={isLoading}
        isShiny={isShiny}
        selection={selection}
        setIsLoading={setIsLoading}
        setIsShiny={setIsShiny}
        updateSelection={updateSelection}
      />
    </Card>
  );
};
