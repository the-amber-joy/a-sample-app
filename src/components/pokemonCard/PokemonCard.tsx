import { padStart, sample, startCase } from "lodash";

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
import {
  FlavorTextResponse,
  getFlavorTextById,
} from "../../api/getFlavorTextById";
import { PokemonResponse, getPokemon } from "../../api/getPokemon";
import { useSelectionContext } from "../../context/SelectionContext";
import { StarBtn } from "./StarBtn";
import { Pokemon } from "../../types/Pokemon";

export const PokemonCard = () => {
  const { selection, updateSelection } = useSelectionContext();
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [headingText, setHeadingText] = useState<string>("Loading Pokemon");
  const [flavorText, setFlavorText] = useState<string>("");

  useEffect(() => {
    const fetchFlavorText = async (pokemon: Pokemon) => {
      await getFlavorTextById(pokemon.id).then((res: FlavorTextResponse) => {
        if (res.status === 404) {
          console.log(res);
        }
        if (res.status === 200) {
          updateSelection({
            ...pokemon,
            descriptions: res.text,
          });
          setIsLoading(false);
        }
      });
    };

    const fetchPokemon = async () => {
      await getPokemon().then(async (res: PokemonResponse) => {
        if (res.status === 404) {
          console.log(res);
        }
        if (res.status === 200) {
          await fetchFlavorText(res.pokemon).catch(console.error);
        }
      });
    };

    fetchPokemon().catch(console.error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    getPokemon().then((res) => {
      if (res.status === 404) {
        console.log(res);
      }
      if (res.status === 200) {
        getFlavorTextById(res.pokemon.id).then((textResponse) => {
          if (res.status === 404) {
            console.log(res);
          }
          if (res.status === 200) {
            updateSelection({
              ...res.pokemon,
              descriptions: textResponse.text,
            });
          }
          setIsLoading(false);
          setIsShiny(false);
        });
      }
    });
  };

  useEffect(() => {
    if (!isLoading && selection) {
      if (selection?.isRandom) {
        setHeadingText("This is a random Pokemon");
      }
      if (!selection?.isRandom) {
        setHeadingText("This is your Pokemon");
      }
      const flavorText = sample(selection.descriptions) || "";
      setFlavorText(flavorText);
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
        <CardBody>
          <Center>
            <Image
              maxH="200px"
              maxW="200px"
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
              <Text>{flavorText}</Text>
            </Stack>
          )}
        </CardBody>
      )}
      <Divider />
      <CardFooter justify="space-between">
        <ButtonGroup spacing="1">
          <Button
            isDisabled={isLoading}
            variant="solid"
            colorScheme="green"
            onClick={() => handleClick()}
            size={{ base: "xs", md: "sm", lg: "md" }}
          >
            Pick Another!
          </Button>
          <Button
            isDisabled={isLoading}
            variant="outline"
            colorScheme={isShiny ? "purple" : "cyan"}
            onClick={() => {
              setIsShiny(!isShiny);
            }}
            size={{ base: "xs", md: "sm", lg: "md" }}
          >
            {isShiny ? "Make it Default" : "Make it Shiny!"}
          </Button>
        </ButtonGroup>
        <StarBtn isLoading={isLoading} />
      </CardFooter>
    </Card>
  );
};
