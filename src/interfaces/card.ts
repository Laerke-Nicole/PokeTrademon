
export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes?: string[];
  types?: string[]; // ✅ Add this to fix the error
  hp?: string;
  rarity?: string;
  images: {
    small: string;
    large?: string;
  };
  set?: {
    name: string;
  };
}



  