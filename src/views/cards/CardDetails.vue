<template>
    <div v-if="card && card.length > 0" class="flex flex-wrap">
      <div class="w-1/2 p-4">
        <img :src="card[0].images.small" alt="card image" class="w-full rounded-lg object-cover h-full" />
      </div>
      <div class="w-1/2 p-4">
        <h2 class="text-xl font-bold">{{ card[0].name }}</h2>
        <p><strong>HP:</strong> {{ card[0].hp || 'N/A' }}</p>
        <p><strong>Supertype:</strong> {{ card[0].supertype }}</p>
        <p v-if="card[0].types"><strong>Types:</strong> {{ card[0].types.join(', ') }}</p>
        <p v-if="card[0].rarity"><strong>Rarity:</strong> {{ card[0].rarity }}</p>
        <p v-if="card[0].set?.name"><strong>Set:</strong> {{ card[0].set.name }}</p>
      </div>
    </div>
  
    <div v-else>
      Loading card details...
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useCards } from '../../modules/useCards';
  import type { PokemonCard } from '../../interfaces/card';
  import { scrollToTop } from '../../modules/scrollToTop/TopRouterView';
  
  onMounted(() => {
    scrollToTop(); 
  });
  
  const route = useRoute();
  const card = ref<PokemonCard[] | null>(null);
  
  const { fetchCardById } = useCards();
  
  onMounted(async () => {
    const cardId = route.params.id as string;
    try {
      const fetchedCard = await fetchCardById(cardId);
      card.value = fetchedCard;
      console.log("Fetched card:", card.value);
    } catch (err) {
      console.error("Error loading card:", err);
    }
  });
  </script>
  
  <style scoped>
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  </style>
  