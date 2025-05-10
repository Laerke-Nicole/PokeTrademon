export type Card = { 
    _id: string;
    name: string;
    description: string;
    imageURL: string;
    price: number;
    stock: number;
    discount: boolean;
    discountPct: number;
    isHidden: boolean;
    _createdBy: string;
}

//  export type that created new product without created by
export type newCard = Omit<Card, '_id'> & Partial<Pick<Card, '_createdBy'>>


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



  