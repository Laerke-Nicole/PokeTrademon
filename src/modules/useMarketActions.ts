import { useCollection } from './useCollection'

export const useMarketActions = () => {
  const { addCardToCollection } = useCollection()

  const handleAddToCollection = async (cardId: string) => {
    const uid = localStorage.getItem('userIDToken')?.replace(/"/g, '')
    if (!uid) return alert('Login required')
    await addCardToCollection(cardId)
  }

  return {
    handleAddToCollection,
  }
}
