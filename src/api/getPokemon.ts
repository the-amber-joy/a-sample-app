import axios from "axios";
import { random } from "lodash";
import { Pokemon } from "../types/Pokemon";

export interface PokemonResponse {
  pokemon: Pokemon;
  status: number
}

/**
 *
 * @param {string | null} [searchTerm] - name of pokemon being searched for
 * @returns {PokemonResponse}
 */
export async function getPokemon(searchTerm?: string | null) {
  try {
    return axios
    // As of 2023-12-20, PokeAPI goes up to 1025, but no flavor text after 1008, and no pix after 1017 
      .get(`https://pokeapi.co/api/v2/pokemon/${searchTerm || random(1, 1025)}`)
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

          return { pokemon, status };
        },
        (err) => err.response
      );
  } catch (err) {
    console.log("error: ", err);
  }
}

/**
 *
 * @param {number | null} id - ID of pokemon being searched for
 * @returns {Pokemon: Pokemon, status: number}
 */
export async function getPokemonById(id: number) {
  try {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
      (response) => {
        const { data, status } = response;
        const pokemon: Pokemon = {
          id: data.id,
          name: data.name,
          defaultSprite: data.sprites.other["official-artwork"].front_default,
          shinySprite: data.sprites.other["official-artwork"].front_shiny,
          spriteIcon: data.sprites.front_default,
        };
        return { pokemon, status };
      },
      (err) => err.response
    );
  } catch (err) {
    console.log("error: ", err);
  }
}
