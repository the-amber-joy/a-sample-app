import { Button, Image } from "@chakra-ui/react";

import { padStart, startCase } from "lodash";
import { useSelectionContext } from "../../context/SelectionContext";
import { Pokemon } from "../../types/Pokemon";
import { getPokemonById } from "../../api/getPokemon";
import { getFlavorTextById } from "../../api/getFlavorTextById";

export const FavoriteCard = ({ name, id, spriteIcon }: Pokemon) => {
  const { updateSelection } = useSelectionContext();

  const handleClick = () => {
    getPokemonById(id).then((res) => {
      if (res.status === 404) {
        console.log(res);
      }
      if (res.status === 200) {
        getFlavorTextById(id).then((textResponse) => {
          if (res.status === 404) {
            console.log(res);
          }
          if (res.status === 200) {
            updateSelection({
              ...res.pokemon,
              descriptions: textResponse.text,
            });
          }
        });
      }
    });
  };

  return (
    <Button
      minH="75px"
      minW="sm"
      onClick={() => {
        handleClick();
      }}
      overflow="hidden"
    >
      <Image src={spriteIcon} marginLeft="-6" marginRight="0" />
      {startCase(name)} # {padStart(id.toString(), 4, "0")}
    </Button>
  );
};
