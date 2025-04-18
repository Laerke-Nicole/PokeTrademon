import axios from 'axios';
import type { TradeOffer } from '../interfaces/trade';

const BASE_URL = 'http://localhost:5004/api/trades';

export const createTrade = async (data: {
  senderId: string;
  receiverId: string;
  senderCards: { cardId: string; quantity: number }[];
  receiverCards: { cardId: string; quantity: number }[];
}) => {
  const response = await axios.post(BASE_URL, data);
  return response.data;
};

export const getUserTrades = async (userId: string): Promise<TradeOffer[]> => {
  const response = await axios.get(`${BASE_URL}/${userId}`);
  return response.data;
};

export const acceptTrade = async (tradeId: string) => {
  const response = await axios.patch(`${BASE_URL}/${tradeId}/accept`);
  return response.data;
};

export const declineTrade = async (tradeId: string) => {
  const response = await axios.patch(`${BASE_URL}/${tradeId}/decline`);
  return response.data;
};
