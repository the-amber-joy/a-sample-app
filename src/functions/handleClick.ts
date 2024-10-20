import { Pokemon } from "pokeapi-js-wrapper";
import { getDescriptionById } from "../api/getDescriptionById";
import { getPokemon } from "../api/getPokemon";

interface Props {
  updateSelection: (newSelection: Pokemon) => void;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShiny?: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm?: string;
}
export default function fetchPokemon({
  setIsLoading,
  setIsShiny,
  updateSelection,
  searchTerm,
}: Props) {
  if (setIsLoading) setIsLoading(true);
  getPokemon(searchTerm).then((res) => {
    if (res.status >= 400) {
      console.log(res);
    } else {
      getDescriptionById(res.pokemon.id).then((textResponse) => {
        if (res.status >= 400) {
          console.log(res);
        } else {
          updateSelection({
            ...res.pokemon,
            descriptions: textResponse.text,
          });
        }
        if (setIsLoading && setIsShiny) {
          setIsLoading(false);
          setIsShiny(false);
        }
      });
    }
  });
}
