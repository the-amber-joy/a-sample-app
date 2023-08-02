import { SearchIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import getPokemon from "../api/getPokemon";
import { useSelectionContext } from "../context/SelectionContext";

export const SearchComponent = () => {
  const { selection, updateSelection } = useSelectionContext();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const handleSubmit = () => {
    getPokemon(searchTerm).then((res) => {
      if (res) {
        updateSelection(res);
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
      <HStack w="auto">
        <Input
          placeholder={"Search by name"}
          onChange={(e) => setSearchTerm(e.currentTarget.value)}
          value={searchTerm}
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
    </form>
  );
};
