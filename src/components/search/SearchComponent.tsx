import { SearchIcon } from "@chakra-ui/icons";
import {
  CloseButton,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { kebabCase } from "lodash";
import { useState } from "react";
import {
  DescriptionResponse,
  getDescriptionById,
} from "../../api/getDescriptionById";
import { PokemonResponse, getPokemon } from "../../api/getPokemon";
import { useSelectionStore } from "../../stores/selectionStore";

export const SearchComponent = () => {
  const { updateSelection } = useSelectionStore();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // kebabcase considers numbers to be separate words,
    // but the PokeAPI considers them to be part of the name (e)
    // so we need to remove the hyphens surrounding the numeric digits
    const sanitizedSearchTerm = kebabCase(searchTerm.toLowerCase()).replace(
      /-(\d+)-?/g,
      "$1",
    );
    await getPokemon(sanitizedSearchTerm).then((res: PokemonResponse) => {
      if (res.status >= 400) {
        setIsInvalid(true);
      } else {
        getDescriptionById(res.pokemon.id).then(
          (textResponse: DescriptionResponse) => {
            if (res.status >= 400) {
              console.log(res);
            } else {
              updateSelection({
                ...res.pokemon,
                descriptions: textResponse.text,
              });
            }
          },
        );
        setSearchTerm("");
      }
      setIsLoading(false);
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <FormControl isInvalid={isInvalid}>
        <HStack w={{ base: "auto", lg: "sm" }}>
          <InputGroup>
            <Input
              placeholder="Search by name"
              onChange={(e) => {
                setIsInvalid(false);
                setSearchTerm(e.currentTarget.value);
              }}
              value={searchTerm}
              errorBorderColor="red"
            />
            {searchTerm !== "" && (
              <InputRightElement>
                <CloseButton
                  aria-label="Clear Search Input"
                  onClick={() => {
                    setIsInvalid(false);
                    setSearchTerm("");
                  }}
                />
              </InputRightElement>
            )}
          </InputGroup>
          <IconButton
            type="submit"
            isDisabled={isLoading || searchTerm === ""}
            aria-label="Search by name"
            icon={isLoading ? <Spinner size="sm" /> : <SearchIcon />}
            onClick={() => {
              handleSubmit();
            }}
          />
        </HStack>
        {isInvalid && (
          <FormErrorMessage>This is not a valid Pokemon name.</FormErrorMessage>
        )}
      </FormControl>
    </form>
  );
};
