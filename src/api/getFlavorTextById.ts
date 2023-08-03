import axios from "axios";
import { map } from "lodash";

export interface FlavorTextResponse {
  text: string[];
  status: number
}

/**
 *
 * @param {number | null} id - ID of pokemon
 * @returns {FlavorTextResponse}
 */
export async function getFlavorTextById(id: number) {
  try {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(
      (response) => {
        const { data, status } = response;

        function checkLanguage(obj: { language: { name: string } }) {
          return obj.language.name === "en";
        }

        const entries = data["flavor_text_entries"].filter(checkLanguage);

        // clean up and return array of just flavor text options
        const sanitizedTextArray = map(entries, (entry) =>
          entry.flavor_text.replace(/\r\n/g, "").replace(/\f/g, " ")
        );
        return { text: sanitizedTextArray, status };
      },
      (err) => err.response
    );
  } catch (err) {
    console.log("error: ", err);
  }
}
