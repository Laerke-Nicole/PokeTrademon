export interface TradeUser {
  _id: string;
  username: string;
}

export interface TradeCard {
  cardId: string;
  quantity: number;
  name: string;
  image: string;
}

export interface TradeOffer {
  _id: string;
  senderId: TradeUser;  // ✅ Instead of string
  receiverId: TradeUser; // ✅ Instead of string
  senderCards: TradeCard[];
  receiverCards: TradeCard[];
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface DetailedTradeCard extends TradeCard {
  image: string;
  name: string;
}

