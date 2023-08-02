import axios from "axios";
import { sample } from "lodash";

export default async function getFlavorTextById(id: number) {
  try {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((response) => {
        function checkLanguage(obj: { language: { name: string } }) {
          return obj.language.name === "en";
        }

        const entries =
          response.data["flavor_text_entries"].filter(checkLanguage);

        // get a random flavor_text & sanitize it for display
        const sanitizedText = sample(entries)
          .flavor_text.replace(/\r\n/g, "")
          .replace(/\f/g, " ");

        return sanitizedText;
      });
  } catch (err) {
    console.log("error: ", err);
  }
}
