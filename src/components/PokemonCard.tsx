import axios from "axios";
import { random, sample, startCase } from "lodash";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Pokemon from "../types/Pokemon";
import { useEffect, useState } from "react";

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

  async function getPokemonDetails() {
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

            const sanitizedText = sample(entries)
              .flavor_text.replace(/\r\n/g, "")
              .replace(/\f/g, " ");

            setPokemonDetails(sanitizedText);
          });
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  useEffect(() => {
    getRandomPokemon();
  }, []);

  useEffect(() => {
    getPokemonDetails();
  }, [randomPokemon]);

  return (
    <Card maxW="sm">
      <CardHeader>
        <Heading size="md">This is a random Pokemon</Heading>
      </CardHeader>
      {
        <CardBody>
          <Image
            src={
              isShiny
                ? randomPokemon?.shinySprite
                : randomPokemon?.defaultSprite
            }
            alt={randomPokemon?.name}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">
              {startCase(randomPokemon?.name)} # {randomPokemon?.id}
            </Heading>
            <Text>{pokemonDetails}</Text>
          </Stack>
        </CardBody>
      }
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              getRandomPokemon();
              setIsShiny(false);
            }}
          >
            Pick Another!
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => {
              setIsShiny(!isShiny);
            }}
          >
            {isShiny ? "Make it Default" : "Make it Shiny!"}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
