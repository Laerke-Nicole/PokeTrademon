import { ref } from 'vue';
import { getAuthToken } from './auth/userModels';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004';
const COLLECTION_URL = `${BASE_URL}/collections`;
const CARD_URL = `${BASE_URL}/pokemon/cards`;

export interface CollectionItem {
  cardId: string;
  quantity: number;
  condition: string;
  name: string;
  image: string;
}

export const useCollection = () => {
  const collection = ref<CollectionItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCollection = async (userId: string) => {
    const token = getAuthToken();
    if (!userId || !token) {
      console.warn('No user ID or token found. Are you logged in?');
      return;
    }
  
    try {
      loading.value = true;
      const res = await fetch(`${COLLECTION_URL}/${userId}`, {
        headers: {
          'auth-token': token,
        },
      });
  
      if (!res.ok) throw new Error("Failed to fetch collection");
  
      const data = await res.json();
  
      const enrichedCollection = await Promise.all(
        data.collection.map(async (entry: { cardId: string; quantity: number; condition: string }) => {
          try {
            const cardRes = await fetch(`${CARD_URL}/${entry.cardId}`);
            const cardData = await cardRes.json();
            return {
              ...entry,
              name: cardData.data?.name || entry.cardId,
              image: cardData.data?.images?.small || '',
            };
          } catch (err) {
            console.warn(`Failed to fetch card ${entry.cardId}`, err);
            return {
              ...entry,
              name: entry.cardId,
              image: '',
            };
          }
        })
      );
      
  
      collection.value = enrichedCollection.filter(c => c.quantity > 0);
    } catch (err) {
      error.value = (err as Error).message || 'Failed to load collection';
      console.error('Error fetching collection:', error.value);
    } finally {
      loading.value = false;
    }
  };
  

  const addCardToCollection = async (cardId: string) => {
    const userId = localStorage.getItem('userIDToken')?.replace(/"/g, '');
    const authToken = localStorage.getItem('isToken');
  
    if (!userId || !authToken) {
      alert('Login required');
      return;
    }
  
    try {
      await fetch(COLLECTION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken,
        },
        body: JSON.stringify({ userId, cardId }),
      });
  
      await fetchCollection(userId);
    } catch (err) {
      error.value = (err as Error).message || 'Failed to add card';
      console.error('Error adding card:', error.value);
    }
  };
  

  const updateCardInCollection = async (cardId: string, quantity: number, condition: string) => {
    const token = getAuthToken();
const userId = localStorage.getItem('userIDToken')?.replace(/"/g, '');

if (!userId || !token) {
  console.warn('Missing userId or token in updateCardInCollection');
  return;
}
    try {
      const res = await fetch(`${COLLECTION_URL}/${userId}/${cardId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify({ quantity, condition }),
      });
  
      const json = await res.json();
      if (!res.ok) {
        console.error("PATCH failed:", json);
        return;
      }
  
      await fetchCollection(userId);
    } catch (error) {
      throw new Error('Failed to update card');
    }
  };
  
  
  
  
  const deleteCardFromCollection = async (cardId: string) => {
    const token = getAuthToken();
    const userId = localStorage.getItem('userIDToken')?.replace(/"/g, '');
    
    if (!userId || !token) {
      console.warn('Missing userId or token in deleteCardFromCollection');
      return;
    }
  
    try {
      const res = await fetch(`${COLLECTION_URL}/${userId}/${cardId}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token,
        },
      });
  
      const json = await res.json();
      if (!res.ok) {
        console.error("DELETE failed:", json);
        return;
      }
  
      await fetchCollection(userId);
    } catch (error) {
      console.error("deleteCardFromCollection error:", error);
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
