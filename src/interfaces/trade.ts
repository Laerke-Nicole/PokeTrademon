export interface TradeCard {
  cardId: string;
  quantity: number;
}

export interface TradeOffer {
  _id: string;
  senderId: string;
  receiverId: string;
  senderCards: TradeCard[];
  receiverCards: TradeCard[];
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
