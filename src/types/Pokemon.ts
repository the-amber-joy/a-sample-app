export interface Pokemon {
  id: number;
  name: string;
  descriptions?: string[];
  isRandom?: boolean;
  // urls for the pngs
  defaultSprite?: string;
  shinySprite?: string;
  spriteIcon?: string;
}
