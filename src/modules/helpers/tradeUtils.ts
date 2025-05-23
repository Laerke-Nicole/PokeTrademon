import type { TradeCard, TradeOffer } from '../../interfaces/trade'

/**
 * Format TradeCard list as a string: "Charizard (x2), Bulbasaur (x1)"
 */
export const formatCardList = (cards: TradeCard[]): string =>
  cards.map((c) => `${c.cardId} (x${c.quantity})`).join(', ')

/**
 * Normalize sender ID and compare it to current user ID
 */
export const isTradeSender = (trade: TradeOffer, userId: string): boolean => {
  const sender = typeof trade.senderId === 'string' ? trade.senderId : trade.senderId._id
  return sender === userId
}

/**
 * Get safe username from string or object
 */
export const extractUsername = (u: string | { username?: string } | null | undefined): string => {
  if (!u) return ''
  if (typeof u === 'string') return u
  return u.username || ''
}

/**
 * Check if trade is completed
 */
export const isCompletedTrade = (status: string): boolean =>
  status === 'accepted' || status === 'declined'
