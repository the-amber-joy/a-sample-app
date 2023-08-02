import { padStart, startCase } from "lodash";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Divider,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import getFlavorTextById from "../api/getFlavorTextById";
import getPokemon from "../api/getPokemon";
import { useSelectionContext } from "../context/SelectionContext";
import { StarBtn } from "./StarBtn";

export const PokemonCard = () => {
  const { selection, updateSelection } = useSelectionContext();
  const [pokemonDetails, setPokemonDetails] = useState<string>("");
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPokemon().then((res) => {
      if (res.status === 404) {
        console.log(res);
      }
      if (res.status === 200) {
        updateSelection(res.pokemon);
      }
    });
  }, []);

  useEffect(() => {
    if (selection !== null) {
      getFlavorTextById(selection.id).then((res) => {
        if (res.status === 404) {
          console.log(res);
        }
        if (res.status === 200) {
          setPokemonDetails(res.text);
          setIsLoading(false);
        }
      });
    }
  }, [selection]);

  return (
    <Card w="md" h="xl">
      <CardHeader>
        <Heading size="md">
          {isLoading
            ? "Loading "
            : selection?.isRandom
            ? "This is a random "
            : "This is your "}
          Pokemon
        </Heading>
      </CardHeader>
      {isLoading && (
        <CardBody>
          <Center>
            <Spinner size="xl" marginTop={125} />
          </Center>
        </CardBody>
      )}
      {!isLoading && (
        <CardBody>
          <Center>
            <Image
              maxH={"200px"}
              maxW={"200px"}
              src={isShiny ? selection?.shinySprite : selection?.defaultSprite}
              alt={selection?.name}
              borderRadius="sm"
            />
          </Center>
          {selection && (
            <Stack mt="6" spacing="3">
              <Heading size="md">
                {startCase(selection.name)} #{" "}
                {padStart(selection.id.toString(), 4, "0")}
              </Heading>
              <Text>{pokemonDetails}</Text>
            </Stack>
          )}
        </CardBody>
      )}
      <Divider />
      <CardFooter justify="space-between">
        <ButtonGroup spacing="1">
          <Button
            variant="solid"
            colorScheme="green"
            onClick={() => {
              setIsLoading(true);
              getPokemon().then((res) => {
                if (res) updateSelection(res.pokemon);
              });
              setIsShiny(false);
            }}
          >
            Pick Another!
          </Button>
          <Button
            variant="outline"
            colorScheme={isShiny ? "purple" : "cyan"}
            onClick={() => {
              setIsShiny(!isShiny);
            }}
          >
            {isShiny ? "Make it Default" : "Make it Shiny!"}
          </Button>
        </ButtonGroup>
        {selection && <StarBtn />}
      </CardFooter>
    </Card>
  );
};
