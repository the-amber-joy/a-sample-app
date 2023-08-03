import { SearchIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { kebabCase } from "lodash";
import { useState } from "react";
import getPokemon from "../../api/getPokemon";
import { useSelectionContext } from "../../context/SelectionContext";

export const SearchComponent = () => {
  const { updateSelection } = useSelectionContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setIsLoading(true);

    getPokemon(kebabCase(searchTerm.toLowerCase())).then((res) => {
      if (res.status === 404) {
        setIsInvalid(true);
      }
      if (res.status === 200) {
        updateSelection(res.pokemon);
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
          <Input
            placeholder="Search by name"
            onChange={(e) => {
              setIsInvalid(false);
              setSearchTerm(e.currentTarget.value);
            }}
            value={searchTerm}
            errorBorderColor="red"
          />
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
