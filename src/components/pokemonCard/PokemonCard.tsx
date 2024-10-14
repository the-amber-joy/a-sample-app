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
  DescriptionResponse,
  getDescriptionById,
} from "../../api/getDescriptionById";
import { PokemonResponse, getPokemon } from "../../api/getPokemon";
import { useSelectionContext } from "../../context/SelectionContext";
import { Pokemon } from "../../types/Pokemon";
import { StarBtn } from "./StarBtn";

export const PokemonCard = () => {
  const { selection, updateSelection } = useSelectionContext();
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [headingText, setHeadingText] = useState<string>("Loading Pokemon");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchDescription = async (pokemon: Pokemon) => {
      await getDescriptionById(pokemon.id).then((res: DescriptionResponse) => {
        if (res.status === 404) {
          console.log(res);
        } else {
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
          throw res;
        } else {
          await fetchDescription(res.pokemon).catch((e) => console.error(e));
        }
      });
    };

    fetchPokemon().catch((e) => console.error(e));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    getPokemon().then((res) => {
      if (res.status === 404) {
        console.log(res);
      } else {
        getDescriptionById(res.pokemon.id).then((textResponse) => {
          if (res.status === 404) {
            console.log(res);
          } else {
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
            <Stack mt="6">
              <Heading size="md">
                {startCase(selection.name)} #{" "}
                {padStart(selection.id.toString(), 4, "0")}{" "}
              </Heading>
              <Text fontSize="lg">{description}</Text>
            </Stack>
          )}
        </CardBody>
      )}
      <Divider />
      <CardFooter justify="space-between" alignItems="center">
        <ButtonGroup
          spacing={{ base: "0", sm: "1" }}
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Button
            isDisabled={isLoading}
            variant="solid"
            colorScheme="green"
            onClick={() => handleClick()}
            size={{ base: "sm", lg: "md" }}
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
            size={{ base: "sm", lg: "md" }}
          >
            {isShiny ? "Make it Default" : "Make it Shiny!"}
          </Button>
        </ButtonGroup>
        <StarBtn
          size={{ base: "sm", lg: "md" }}
          isDisabled={isLoading}
          selection={selection}
        />
      </CardFooter>
    </Card>
  );
};
