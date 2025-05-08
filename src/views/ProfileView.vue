<template>
  <div class="pt-30 five-percent dark-bg">
    <h2 class="text-xl font-bold mb-4 dark-headline">Your Collection</h2>

    <div v-if="loading" class="dark-text">Loading your cards...</div>
    <div v-else-if="error" class="dark-text">{{ error }}</div>
    <div v-else-if="collection.length === 0" class="dark-text">You have no cards in your collection.</div>

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
import { onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useCollection } from '../modules/useCollection';
import CollectionCard from '../components/CollectionCard.vue';
import { state } from '../modules/globalStates/state'
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});

// go to login page if user isnt logged in
const router = useRouter()

onMounted(() => {
if (!state.isLoggedIn) {
  router.push('/auth')
}
})


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