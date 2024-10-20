import { Button, Image } from "@chakra-ui/react";

import { padStart, startCase } from "lodash";
import { useSelectionContext } from "../../context/SelectionContext";
import fetchPokemon from "../../functions/handleClick";
import { Pokemon } from "../../types/Pokemon";

export const FavoriteCard = ({ name, id, spriteIcon }: Pokemon) => {
  const { updateSelection } = useSelectionContext();

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
