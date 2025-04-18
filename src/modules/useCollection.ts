// src/modules/useCollection.ts
import { ref } from 'vue';

const COLLECTION_URL = 'http://localhost:5004/api/collections';
const CARD_URL = 'http://localhost:5004/api/pokemon/cards';

export interface CollectionItem {
  cardId: string;
  quantity: number;
  condition: string;
  image: string;
}

// 🧠 Helper to always get the latest userId from localStorage
const getUserId = (): string | null =>
  localStorage.getItem('userIDToken')?.replace(/"/g, '') || null;

export const useCollection = () => {
  const collection = ref<CollectionItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCollection = async () => {
    const userId = getUserId();
    if (!userId) {
      console.warn('⛔ No user ID found. Are you logged in?');
      return;
    }

    console.log('🔄 Fetching collection for user:', userId);
    loading.value = true;

    try {
      const res = await fetch(`${COLLECTION_URL}/${userId}`);
      const data = await res.json();

      const enrichedCollection = await Promise.all(
        data.collection.map(async (entry: { cardId: string; quantity: number; condition: string }) => {
          const cardRes = await fetch(`${CARD_URL}/${entry.cardId}`);
          const cardData = await cardRes.json();
          const image = cardData.data?.images?.small || '';
          return {
            ...entry,
            image,
          };
        })
      );

      collection.value = enrichedCollection;
    } catch (err) {
      error.value = (err as Error).message || 'Failed to load collection';
      console.error('❌ Error fetching collection:', error.value);
    } finally {
      loading.value = false;
    }
  };

  const addCardToCollection = async (cardId: string) => {
    const userId = getUserId();
    if (!userId) {
      alert('Login required');
      return;
    }

    console.log(`➕ Adding card "${cardId}" to collection for user: ${userId}`);
    try {
      await fetch(COLLECTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, cardId }),
      });
      await fetchCollection();
    } catch (err) {
      error.value = (err as Error).message || 'Failed to add card';
      console.error('❌ Error adding card:', error.value);
    }
  };

  const updateCardInCollection = async (cardId: string, quantity: number, condition: string) => {
    const userId = getUserId();
    if (!userId) return;

    console.log(`✏️ Updating card "${cardId}" for user ${userId} | Qty: ${quantity}, Cond: ${condition}`);
    try {
      await fetch(`${COLLECTION_URL}/${userId}/${cardId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity, condition }),
      });
      await fetchCollection();
    } catch (err) {
      error.value = (err as Error).message || 'Failed to update card';
      console.error('❌ Error updating card:', error.value);
    }
  };

  const deleteCardFromCollection = async (cardId: string) => {
    const userId = getUserId();
    if (!userId) return;

    console.log(`🗑️ Deleting card "${cardId}" from collection for user ${userId}`);
    try {
      await fetch(`${COLLECTION_URL}/${userId}/${cardId}`, {
        method: 'DELETE',
      });
      await fetchCollection();
    } catch (err) {
      error.value = (err as Error).message || 'Failed to delete card';
      console.error('❌ Error deleting card:', error.value);
    }
  };

  return {
    collection,
    loading,
    error,
    fetchCollection,
    addCardToCollection,
    updateCardInCollection,
    deleteCardFromCollection,
  };
};
