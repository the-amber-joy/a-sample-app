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
  FlavorTextResponse,
  getFlavorTextById,
} from "../../api/getFlavorTextById";
import { PokemonResponse, getPokemon } from "../../api/getPokemon";
import { useSelectionContext } from "../../context/SelectionContext";

export const SearchComponent = () => {
  const { updateSelection } = useSelectionContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // kebabcase considers number to be separate words
    // The only pokemon with a number in its name is Porygon 2,
    // whose slug is 'porygon2' and should not be hyphenated
    const sanitizedSearchTerm =
      searchTerm.toLowerCase() === "porygon2" ||
      searchTerm.toLowerCase() === "porygon 2"
        ? "porygon2"
        : kebabCase(searchTerm.toLowerCase());
    await getPokemon(sanitizedSearchTerm).then((res: PokemonResponse) => {
      if (res.status === 404) {
        setIsInvalid(true);
      } else {
        getFlavorTextById(res.pokemon.id).then(
          (textResponse: FlavorTextResponse) => {
            if (res.status === 404) {
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
