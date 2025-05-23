import { ref } from 'vue'
import { fetchUserCollection, addCard, updateCard, deleteCard } from '../api/collectionAPI'
import { enrichCollectionWithCardData } from './helpers/cardEnricher'

export interface CollectionItem {
  cardId: string
  quantity: number
  condition: string
  name: string
  image: string
}

export const useCollection = () => {
  const collection = ref<CollectionItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchCollection = async (userId: string) => {
    try {
      loading.value = true
      const raw = await fetchUserCollection(userId)
      const enriched = await enrichCollectionWithCardData(raw.collection)
      collection.value = enriched.filter(c => c.quantity > 0)
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  const addCardToCollection = async (userId: string, cardId: string) => {
    try {
      await addCard(userId, cardId)
      await fetchCollection(userId)
    } catch (err) {
      error.value = (err as Error).message
    }
  }

  const updateCardInCollection = async (userId: string, cardId: string, quantity: number, condition: string) => {
    try {
      await updateCard(userId, cardId, quantity, condition)
      await fetchCollection(userId)
    } catch (err) {
      error.value = (err as Error).message
    }
  }

  const deleteCardFromCollection = async (userId: string, cardId: string) => {
    try {
      await deleteCard(userId, cardId)
      await fetchCollection(userId)
    } catch (err) {
      error.value = (err as Error).message
    }
  }

  return {
    collection,
    loading,
    error,
    fetchCollection,
    addCardToCollection,
    updateCardInCollection,
    deleteCardFromCollection,
  }
}
