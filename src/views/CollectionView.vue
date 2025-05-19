<template>
  <div class="pt-30 five-percent dark-bg">
    <h2 class="text-xl font-bold pb-6 dark-headline">Your Collection</h2>

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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCollection } from '../modules/useCollection';
import CollectionCard from '../components/CollectionCard.vue';
import { state } from '../modules/globalStates/state';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';
import { useUsers } from '../modules/auth/userModels';

const router = useRouter();
const { user, loadUser } = useUsers();

const {
  collection,
  loading,
  error,
  fetchCollection,
  updateCardInCollection, 
  deleteCardFromCollection
} = useCollection();


const updateCard = (cardId: string, quantity: number, condition: string) => {
  if (user.value?._id) {
    updateCardInCollection(cardId, quantity, condition);
  }
};

const deleteCard = (cardId: string) => {
  if (user.value?._id) {
    deleteCardFromCollection(cardId);
  }
};


// main setup
onMounted(async () => {
  scrollToTop();

  await loadUser();

  if (!state.isLoggedIn || !user.value?._id) {
    router.push('/auth');
    return;
  }
  
  await fetchCollection(user.value._id);});

</script>

