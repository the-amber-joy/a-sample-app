import { Button, ButtonGroup, CardFooter } from "@chakra-ui/react";
import { getFlavorTextById } from "../../../api/getFlavorTextById";
import { getPokemon } from "../../../api/getPokemon";
import { Pokemon } from "../../../types/Pokemon";
import { StarBtn } from "../StarBtn";

interface Props {
  isLoading: boolean;
  isShiny: boolean;
  selection: Pokemon | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShiny: React.Dispatch<React.SetStateAction<boolean>>;
  updateSelection: (newSelection: Pokemon) => void;
}

export const FooterContents = ({
  isLoading,
  isShiny,
  selection,
  setIsLoading,
  setIsShiny,
  updateSelection,
}: Props) => {
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

  return (
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
  );
};
