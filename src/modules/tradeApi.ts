import type { TradeOffer } from '../interfaces/trade';

export const fetchTradesForUser = async (userId: string): Promise<TradeOffer[]> => {
  const res = await fetch(`http://localhost:5004/api/trades/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch trade offers');
  return await res.json();
};
