import { SearchIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import getPokemon from "../api/getPokemon";
import { useSelectionContext } from "../context/SelectionContext";

export const SearchComponent = () => {
  const { updateSelection } = useSelectionContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const handleSubmit = () => {
    getPokemon(searchTerm.toLowerCase()).then((res) => {
      if (res.status === 404) {
        setIsInvalid(true);
      }
      if (res.status === 200) {
        updateSelection(res.pokemon);
        setSearchTerm("");
      }
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
        <HStack w="auto">
          <Input
            placeholder={"Search by name"}
            onChange={(e) => {
              setIsInvalid(false);
              setSearchTerm(e.currentTarget.value);
            }}
            value={searchTerm}
            errorBorderColor="red"
          />
          <IconButton
            type="submit"
            disabled={searchTerm !== ""}
            aria-label="Search by name"
            icon={<SearchIcon />}
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
