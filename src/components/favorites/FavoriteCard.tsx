import { Button, Image } from "@chakra-ui/react";

import axios from "axios";
import { padStart, startCase } from "lodash";
import { useSelectionContext } from "../../context/SelectionContext";
import { Pokemon } from "../../types/Pokemon";

export const FavoriteCard = ({ name, id, spriteIcon }: Pokemon) => {
  const { updateSelection } = useSelectionContext();

  async function getThisPokemon() {
    try {
      const data = axios
        .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => {
          const { data } = response;
          const pokemon: Pokemon = {
            id: data.id,
            name: data.name,
            defaultSprite: data.sprites.other["official-artwork"].front_default,
            shinySprite: data.sprites.other["official-artwork"].front_shiny,
            spriteIcon: data.sprites.front_default,
          };
          updateSelection(pokemon);
        });

      return data;
    } catch (err) {
      console.log("error: ", err);
    }
  }

  return (
    <Button
      minH="75px"
      minW="md"
      onClick={() => {
        getThisPokemon();
      }}
      overflow="hidden"
    >
      <Image src={spriteIcon} marginLeft="-6" marginRight="0" />
      {startCase(name)} # {padStart(id.toString(), 4, "0")}
    </Button>
  );
};
