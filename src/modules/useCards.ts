import { ref } from 'vue';
import type { PokemonCard } from '../interfaces/card';

export const useCards = () => {
    const cards = ref<PokemonCard[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const totalCount = ref(0);
  
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
        const params = new URLSearchParams({
          q: `${search}${supertype ? ` supertype:${supertype}` : ''}`.trim(),
          page: page.toString(),
          pageSize: pageSize.toString(),
        });
  
        if (sortBy) {
          params.append('orderBy', sortBy);
        }
  
        const res = await fetch(`http://localhost:5004/api/pokemon/cards?${params}`);
        const data = await res.json();
  
        cards.value = data.data;
        totalCount.value = data.totalCount ?? 250;
      } catch (err) {
        console.error('Error fetching Pokémon cards:', err);
      } finally {
        loading.value = false;
      }
    };
  
    return {
      cards,
      loading,
      error,
      totalCount,
      fetchCards,
    };
  };
  