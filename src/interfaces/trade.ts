export interface TradeCard {
  cardId: string;
  quantity: number;
  name: string;
  image: string;
}

export interface TradeOffer {
  _id: string;
  senderId: string;
  receiverId: string;
  senderCards: TradeCard[];
  receiverCards: TradeCard[];
  status: "pending" | "accepted" | "declined" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface DetailedTradeCard extends TradeCard {
  image: string;
  name: string;
}

