const CARD_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5004'}/pokemon/cards`

// In-memory cache to avoid redundant API calls
const cardCache: Record<string, { name: string; image: string }> = {}

export const enrichCollectionWithCardData = async (
  collectionData: { cardId: string; quantity: number; condition: string }[],
) => {
  return await Promise.all(
    collectionData.map(async ({ cardId, quantity, condition }) => {
      // Check cache first
      if (cardCache[cardId]) {
        return {
          cardId,
          quantity,
          condition,
          ...cardCache[cardId],
        }
      }

      try {
        const res = await fetch(`${CARD_URL}/${cardId}`)
        const cardData = await res.json()
        const name = cardData.data?.name || cardId
        const image = cardData.data?.images?.small || ''

        // Cache result
        cardCache[cardId] = { name, image }

        return { cardId, quantity, condition, name, image }
      } catch {
        return { cardId, quantity, condition, name: cardId, image: '' }
      }
    }),
  )
}
