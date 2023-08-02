import axios from "axios";
import { random } from "lodash";
import { Pokemon } from "../types/Pokemon";

/**
 *
 * @param {string | null} [searchTerm] - name of pokemon being searched for
 * @returns {Pokemon}
 */
export default async function getPokemon(searchTerm?: string | null) {
  try {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchTerm || random(1010)}`)
      .then(
        (response) => {
          const { data, status } = response;
          const { id, name, sprites } = data;

          const pokemon: Pokemon = {
            id,
            name,
            defaultSprite: sprites.other["official-artwork"].front_default,
            shinySprite: sprites.other["official-artwork"].front_shiny,
            spriteIcon: sprites.front_default,
            isRandom: searchTerm ? false : true,
          };

          return {pokemon, status};
        },
        (err) => (err.response)
      );
  } catch (err) {
    console.log("error: ", err);
  }
}
