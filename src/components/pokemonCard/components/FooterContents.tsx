import { Button, ButtonGroup, CardFooter } from "@chakra-ui/react";
import fetchPokemon from "../../../functions/handleClick";
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
          onClick={() =>
            fetchPokemon({ setIsLoading, setIsShiny, updateSelection })
          }
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
