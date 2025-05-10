import type { TradeCard } from '../interfaces/trade';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004';

export const getUserCollection = async (userId: string): Promise<{ collection: TradeCard[] }> => {
  const res = await fetch(`${BASE_URL}/collections/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch collection");
  return await res.json();
};
