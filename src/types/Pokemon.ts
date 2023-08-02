export interface Pokemon {
  id: number;
  name: string;
  isRandom?: boolean;
  defaultSprite?: string; // url for the png
  shinySprite?: string; // url for the png
  spriteIcon?: string; // url for the png
}
