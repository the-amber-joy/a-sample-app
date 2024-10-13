import { random } from "lodash";
import { Pokemon } from "../types/Pokemon";
import { P } from "./Pokedex";

export interface PokemonResponse {
  pokemon: Pokemon;
  status: number;
}

/**
 *
 * @param {string | null} [searchTerm] - name of pokemon being searched for
 * @returns {PokemonResponse}
 */
export async function getPokemon(searchTerm?: string | null) {
  try {
    return await P.getPokemonByName(searchTerm || random(1, 1025)).then(
      (response: { id: any; name: any; sprites: any }) => {
        const { id, name, sprites } = response;

        const pokemon: Pokemon = {
          id,
          name,
          defaultSprite: sprites.other["official-artwork"].front_default,
          shinySprite: sprites.other["official-artwork"].front_shiny,
          spriteIcon: sprites.front_default,
          isRandom: searchTerm ? false : true,
        };

        return { pokemon };
      },
      (err: { response: any }) => err.response,
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
    return await P.getPokemonByName(id).then(
      (response: { id: any; name: any; sprites: any }) => {
        const { id, name, sprites } = response;
        const pokemon: Pokemon = {
          id,
          name,
          defaultSprite: sprites.other["official-artwork"].front_default,
          shinySprite: sprites.other["official-artwork"].front_shiny,
          spriteIcon: sprites.front_default,
        };
        return { pokemon };
      },
      (err: { response: any }) => err.response,
    );
  } catch (err) {
    console.log("error: ", err);
  }
}
