import axios from "axios";
import { padStart, random, sample, startCase } from "lodash";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import { FaveBtn } from "./FaveBtn";

export const PokemonCard = () => {
  const [randomPokemon, setRandomPokemon] = useState<Pokemon>();
  const [pokemonDetails, setPokemonDetails] = useState<string>("");
  const [isShiny, setIsShiny] = useState<boolean>(false);
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
          };
          setRandomPokemon(pokemon);
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
    if (randomPokemon) {
      try {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon-species/${randomPokemon.id}`)
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
          });
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }, [randomPokemon]);

  return (
    <Card>
      <CardBody>
        <Center>
          <Image
            maxH={"200px"}
            maxW={"200px"}
            src={
              isShiny
                ? randomPokemon?.shinySprite
                : randomPokemon?.defaultSprite
            }
            alt={randomPokemon?.name}
            borderRadius="sm"
          />
        </Center>
        <Stack mt="6" spacing="3">
          <Heading size="md">
            {startCase(randomPokemon?.name)} #{" "}
            {padStart(randomPokemon?.id.toString(), 4, "0")}
          </Heading>
          <Text>{pokemonDetails}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justify="space-between">
        <ButtonGroup spacing="1">
          <Button
            variant="solid"
            colorScheme="green"
            onClick={() => {
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
        {randomPokemon && <FaveBtn selectedPokemon={randomPokemon} />}
      </CardFooter>
    </Card>
  );
};
