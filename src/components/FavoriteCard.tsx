import { Button, Image } from "@chakra-ui/react";

import { padStart, startCase } from "lodash";
import fetchPokemon from "../functions/fetchPokemon";
import { useSelectionStore } from "../stores/selectionStore";
import { Pokemon } from "../types/Pokemon";

export const FavoriteCard = ({ name, id, spriteIcon }: Pokemon) => {
  const { updateSelection } = useSelectionStore();

  return (
    <Button
      minH="75px"
      minW="sm"
      onClick={() => {
        fetchPokemon({ searchTerm: id.toString(), updateSelection });
      }}
      overflow="hidden"
    >
      <Image src={spriteIcon} marginLeft="-6" marginRight="0" />
      {startCase(name)} # {padStart(id.toString(), 4, "0")}
    </Button>
  );
};
