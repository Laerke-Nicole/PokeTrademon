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

export const fetchUserCollection = async (userId: string): Promise<TradeCard[]> => {
  const res = await fetch(`http://localhost:5004/api/collections/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user collection");
  const data = await res.json();
  return data.collection;
};

export const fetchCardDetails = async (cardId: string) => {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
    headers: {
      'X-Api-Key': import.meta.env.VITE_POKEMON_TCG_API_KEY // or however your key is accessed
    }
  });
  const data = await res.json();
  return data.data;
};

export const acceptTradeOffer = async (tradeId: string) => {
  const res = await fetch(`http://localhost:5004/api/trades/${tradeId}/accept`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Failed to accept trade');
  return res.json();
};

export const declineTradeOffer = async (tradeId: string) => {
  const res = await fetch(`http://localhost:5004/api/trades/${tradeId}/decline`, {
    method: 'PATCH',
  });
  if (!res.ok) throw new Error('Failed to decline trade');
  return res.json();
};

/* // 👇 Fetch user by username
export async function fetchUserByUsername(username: string) {
  const res = await axios.get(`${API_URL}/users/username/${username}`);
  return res.data; // should return the full user object with _id
}
 */