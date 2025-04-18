import axios from 'axios';
import type { TradeOffer, TradeCard } from '../interfaces/trade';

export const fetchTradesForUser = async (userId: string): Promise<TradeOffer[]> => {
  const res = await fetch(`http://localhost:5004/api/trades/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch trade offers');
  return await res.json();
};

export const createTradeOffer = async (trade: {
    senderId: string;
    receiverId: string;
    senderCards: TradeCard[];
    receiverCards: TradeCard[];
  }) => {
    const res = await axios.post('http://localhost:5004/api/trades', trade);
    return res.data;
  };