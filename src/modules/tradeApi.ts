import type { TradeOffer, TradeCard } from '../interfaces/trade';

// ✅ Use dynamic base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004';

// ✅ TRADE ROUTES

export const fetchTradesForUser = async (userId: string): Promise<TradeOffer[]> => {
  const res = await fetch(`${BASE_URL}/trades/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch trade offers');
  return await res.json();
};

export const createTradeOffer = async (offer: {
  senderId: string;
  receiverUsername: string;
  senderCards: TradeCard[];
  receiverCards: TradeCard[];
}) => {
  const response = await fetch(`${BASE_URL}/trades`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(offer)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create trade offer');
  }

  return await response.json();
};

export const acceptTradeOffer = async (tradeId: string, userId: string) => {
  const res = await fetch(`${BASE_URL}/trades/${tradeId}/accept`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to accept trade');
  }

  return await res.json();
};

export const declineTradeOffer = async (tradeId: string, userId: string) => {
  const res = await fetch(`${BASE_URL}/trades/${tradeId}/decline`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to decline trade');
  }

  return await res.json();
};

// ✅ COLLECTION

export const fetchUserCollection = async (userId: string): Promise<TradeCard[]> => {
  const res = await fetch(`${BASE_URL}/collections/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user collection");
  const data = await res.json();
  return data.collection;
};

// ✅ CARD DETAILS FROM EXTERNAL API
export const fetchCardDetails = async (cardId: string) => {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`, {
    headers: {
      'X-Api-Key': import.meta.env.VITE_POKEMON_TCG_API_KEY
    }
  });

  const data = await res.json();
  return data.data;
};
