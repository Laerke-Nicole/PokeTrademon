import type { TradeOffer, TradeCard } from '../interfaces/trade';

const apiUrl = 'http://localhost:5004/api'; // ✅ Add this

export const fetchTradesForUser = async (userId: string): Promise<TradeOffer[]> => {
  const res = await fetch(`${apiUrl}/trades/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch trade offers');
  return await res.json();
};


export const createTradeOffer = async (offer: {
  senderId: string;
  receiverUsername: string; // changed from receiverId
  senderCards: TradeCard[];
  receiverCards: TradeCard[];
}) => {
  const response = await fetch(`${apiUrl}/trades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(offer)
  });

  if (!response.ok) {
    throw new Error('Failed to create trade offer');
  }

  return await response.json();
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

export const acceptTradeOffer = async (tradeId: string, userId: string) => {
  const res = await fetch(`http://localhost:5004/api/trades/${tradeId}/accept`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }) // ✅ Send it
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to accept trade');
  }
  
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