import { Button, Image } from "@chakra-ui/react";

import { padStart, startCase } from "lodash";
import { getDescriptionById } from "../../api/getDescriptionById";
import { getPokemonById } from "../../api/getPokemon";
import { useSelectionContext } from "../../context/SelectionContext";
import { Pokemon } from "../../types/Pokemon";

export const FavoriteCard = ({ name, id, spriteIcon }: Pokemon) => {
  const { updateSelection } = useSelectionContext();

  const handleClick = () => {
    getPokemonById(id).then((res) => {
      if (res.status === 404) {
        console.log(res);
      } else {
        getDescriptionById(id).then((textResponse) => {
          if (res.status === 404) {
            console.log(res);
          } else {
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
