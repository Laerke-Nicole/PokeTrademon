<template>
  <div class="pt-30 five-percent dark-bg">
    <CardSelector mode="view" @card-selected="openModal" />

    <!-- Modal Component -->
    <CardModal
      v-if="showModal && selectedCard"
      :visible="showModal"
      :card="selectedCard"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { PokemonCard } from '../interfaces/card';
import CardSelector from '../components/CardSelector.vue';
import CardModal from '../components/CardModal.vue';
import { state } from '../modules/globalStates/state';

const selectedCard = ref<PokemonCard | null>(null);
const showModal = ref(false);

const openModal = (card: PokemonCard) => {
  selectedCard.value = card;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};


const router = useRouter();

// redirect to homepage if user isnt logged in and try to access the page
if (!state.isLoggedIn) {
  router.push('/');
}
</script>

<style scoped>
/* You can keep or remove styles if they were specific to the old layout */
</style>
