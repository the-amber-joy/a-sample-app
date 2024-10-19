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
import {
  DescriptionResponse,
  getDescriptionById,
} from "../../api/getDescriptionById";
import { PokemonResponse, getPokemon } from "../../api/getPokemon";
import { useSelectionContext } from "../../context/SelectionContext";
import { Pokemon } from "../../types/Pokemon";
import { CardContents } from "./components/CardContents";
import { FooterContents } from "./components/FooterContents";

export const PokemonCard = () => {
  const { selection, updateSelection } = useSelectionContext();
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [headingText, setHeadingText] = useState<string>("Loading Pokemon");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchDescription = async (pokemon: Pokemon) => {
      await getDescriptionById(pokemon.id).then((res: DescriptionResponse) => {
        if (res.status >= 400) {
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
        if (res.status >= 400) {
          throw res;
        } else {
          await fetchDescription(res.pokemon).catch((e) => console.error(e));
        }
      });
    };

    fetchPokemon().catch((e) => console.error(e));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
