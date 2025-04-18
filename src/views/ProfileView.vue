<template>
    <div class="pt-24 five-percent">
      <h2 class="text-xl font-bold mb-4">Your Collection</h2>
  
      <div v-if="loading">Loading your cards...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else-if="collection.length === 0">You have no cards in your collection.</div>
  
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4" v-else>
        <CollectionCard
          v-for="card in collection"
          :key="card.cardId"
          :card="card"
          @update="updateCard"
          @delete="deleteCard"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue';
  import { useCollection } from '../modules/useCollection';
  import CollectionCard from '../components/CollectionCard.vue';
  
  const {
    collection,
    loading,
    error,
    fetchCollection,
    updateCardInCollection,
    deleteCardFromCollection,
  } = useCollection();
  
  const updateCard = (cardId: string, quantity: number, condition: string) => {
    updateCardInCollection(cardId, quantity, condition);
  };
  
  const deleteCard = (cardId: string) => {
    deleteCardFromCollection(cardId);
  };
  
  onMounted(() => {
    fetchCollection();
  });
  </script>
  