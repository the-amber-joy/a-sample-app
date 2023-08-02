import axios from "axios";
import { padStart, random, sample, startCase } from "lodash";

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
import { Pokemon } from "../types/Pokemon";
import { FaveBtn } from "./FaveBtn";
import { useSelectionContext } from "../context/SelectionContext";

export const PokemonCard = () => {
  const { selection, updateSelection } = useSelectionContext();
  const [pokemonDetails, setPokemonDetails] = useState<string>("");
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function getRandomPokemon() {
    try {
      const data = axios
        .get(`https://pokeapi.co/api/v2/pokemon/${random(1015)}`)
        .then((response) => {
          const { data } = response;
          const pokemon: Pokemon = {
            id: data.id,
            name: data.name,
            defaultSprite: data.sprites.other["official-artwork"].front_default,
            shinySprite: data.sprites.other["official-artwork"].front_shiny,
            spriteIcon: data.sprites.front_default,
          };
          updateSelection(pokemon);
        });

      return data;
    } catch (err) {
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    getRandomPokemon();
  }, []);

  useEffect(() => {
    if (selection) {
      try {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon-species/${selection.id}`)
          .then((response) => {
            function checkLanguage(obj: { language: { name: string } }) {
              return obj.language.name === "en";
            }

            const entries =
              response.data["flavor_text_entries"].filter(checkLanguage);

            // get a random flavor_text & sanitize it for display
            const sanitizedText = sample(entries)
              .flavor_text.replace(/\r\n/g, "")
              .replace(/\f/g, " ");

            setPokemonDetails(sanitizedText);
            setIsLoading(false);
          });
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }, [selection]);

  return (
    <Card minH={"80vh"}>
      <CardHeader>
        <Heading size="md">{isLoading ? "Loading " : "This is a random "}Pokemon</Heading>
      </CardHeader>
      {isLoading && (
                <CardBody h="90vh">

        <Center >
          <Spinner size="xl" />
        </Center>
        </CardBody>
      )}
      {!isLoading && (
        <CardBody h="90vh">
          <Center>
            <Image
              maxH={"200px"}
              maxW={"200px"}
              src={isShiny ? selection?.shinySprite : selection?.defaultSprite}
              alt={selection?.name}
              borderRadius="sm"
            />
          </Center>
          <Stack mt="6" spacing="3">
            <>
              <Heading size="md">
                {startCase(selection?.name)} #{" "}
                {padStart(selection?.id.toString(), 4, "0")}
              </Heading>

              <Text>{pokemonDetails}</Text>
            </>
          </Stack>
        </CardBody>
      )}
      <Divider />
      <CardFooter justify="space-between">
        <ButtonGroup spacing="1">
          <Button
            variant="solid"
            colorScheme="green"
            onClick={() => {
              setPokemonDetails("");
              setIsLoading(true);
              getRandomPokemon();
              setIsShiny(false);
            }}
          >
            Pick Another!
          </Button>
          <Button
            variant="outline"
            colorScheme="green"
            onClick={() => {
              setIsShiny(!isShiny);
            }}
          >
            {isShiny ? "Make it Default" : "Make it Shiny!"}
          </Button>
        </ButtonGroup>
        {selection && <FaveBtn />}
      </CardFooter>
    </Card>
  );
};
