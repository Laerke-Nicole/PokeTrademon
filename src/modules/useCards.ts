import { ref } from 'vue';
import type { PokemonCard } from '../interfaces/card';

export const useCards = () => {
  const cards = ref<PokemonCard[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalCount = ref(0);

  // ✅ Dynamically use environment-based API URL
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';

  const fetchCards = async (
    search = '',
    supertype = '',
    page = 1,
    sortBy = ''
  ) => {
    loading.value = true;
    error.value = null;
    const pageSize = 20;

    try {
      const queryParts = [];

      if (search) {
        queryParts.push(`name:${search}*`);
      }

      if (supertype) {
        queryParts.push(`supertype:${supertype}`);
      }

      const q = queryParts.join(" ");
      const params = new URLSearchParams({
        q,
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (sortBy) {
        params.append("orderBy", sortBy);
      }

      const res = await fetch(`${BASE_URL}/pokemon/cards?${params}`);
      const data = await res.json();

      cards.value = data.data || [];
      totalCount.value = data.totalCount ?? 250;
    } catch (err) {
      console.error("❌ Error fetching Pokémon cards:", err);
      cards.value = [];
      error.value = 'Failed to fetch cards.';
    } finally {
      loading.value = false;
    }
  };

  // Inside your `useCards` composable:
const fetchCardById = async (id: string): Promise<PokemonCard[]> => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/pokemon/cards/${id}`);
    const data = await res.json();
    return [data.data]; // wrap in array for consistency with current component
  } catch (err) {
    console.error("❌ Error fetching card by ID:", err);
    throw err;
  }
};

// Make sure to export it:
return {
  cards,
  loading,
  error,
  totalCount,
  fetchCards,
  fetchCardById // ✅ added here
};
}