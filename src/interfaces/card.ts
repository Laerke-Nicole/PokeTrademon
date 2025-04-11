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
    images: {
      small: string;
      large: string;
    };
    // Add more fields from the API if needed
  }
  