export interface Pokemon {
  id: number;
  name: string;
  defaultSprite?: string; // url for the png
  shinySprite?: string; // url for the png
  isFavorite?: boolean
}
