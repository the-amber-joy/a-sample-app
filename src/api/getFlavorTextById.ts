import { map } from "lodash";
import { P } from "./Pokedex";

export interface FlavorTextResponse {
  text: string[];
  status: number;
}

/**
 *
 * @param {number | null} id - ID of pokemon
 * @returns {FlavorTextResponse}
 */
export async function getFlavorTextById(id: number) {
  try {
    return await P.getPokemonSpeciesByName(id).then(
      (response: {
        flavor_text_entries: {
          language: { name: string };
          flavor_text: string;
        }[];
        status: number;
      }) => {
        function checkLanguage(obj: { language: { name: string } }) {
          const preferredLanguage = navigator.language.split("-")[0] || "en";
          return obj.language.name === preferredLanguage;
        }

        const entries = response["flavor_text_entries"].filter(checkLanguage);

        // clean up and return array of just flavor text options
        const sanitizedTextArray = map(entries, (entry) =>
          entry.flavor_text.replace(/\r\n/g, "").replace(/\f/g, " "),
        );
        return { text: sanitizedTextArray, status: response.status };
      },
      (err: { response: any }) => err.response,
    );
  } catch (err) {
    console.log("error: ", err);
  }
}
