import { some } from "lodash";

export const isFavorite = (favorites: { id: number; name: string }[], id: number) => {
  return some(favorites, { id });
};
