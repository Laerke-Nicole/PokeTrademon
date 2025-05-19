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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';
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

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});
</script>

<style scoped>

</style>
