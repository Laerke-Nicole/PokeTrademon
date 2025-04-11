import { ref } from 'vue';
import type { PokemonCard } from '../interfaces/card'; // adjust path if needed

export const useCards = () => {
  const cards = ref<PokemonCard[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const fetchCards = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('http://localhost:5004/api/pokemon/cards');
      if (!response.ok) throw new Error('Failed to fetch cards');
      const data = await response.json();

      cards.value = data.data; // TCG API uses `data` as the main result
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  return { cards, loading, error, fetchCards };
};
