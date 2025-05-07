<template>
  <div class="pt-30 five-percent dark-bg">
    <!-- filters and search -->
    <div class="mb-4 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search Pokémon..."
        class="p-2 border rounded white-bg round-corner dark-text"
        v-model="searchQuery"
        @input="fetchFilteredCards"
      />

      <select v-model="selectedSupertype" @change="fetchFilteredCards" class="p-2 border rounded white-bg round-corner dark-text">
        <option value="" class="dark-text">All Supertypes</option>
        <option value="Pokémon" class="dark-text">Pokémon</option>
        <option value="Trainer" class="dark-text">Trainer</option>
        <option value="Energy" class="dark-text">Energy</option>
      </select>

      <select v-model="sortBy" @change="fetchFilteredCards" class="p-2 border rounded white-bg round-corner dark-text">
        <option value="">Sort by</option>
        <option value="name">Name (A–Z)</option>
        <option value="-name">Name (Z–A)</option>
        <option value="hp">HP (Low–High)</option>
        <option value="-hp">HP (High–Low)</option>
        <option value="rarity">Rarity</option>
        <option value="set.name">Set Name</option>
      </select>
    </div>

    <!-- card list -->
    <div>
      <div v-if="loading" class="dark-text p-2">Loading...</div>

      <div v-else-if="error" class="dark-text p-2">{{ error }}</div>

      <div v-else-if="!cards || cards.length === 0">
      <p class="dark-text p-2">No Pokémon cards found.</p>
    </div>

      <div v-else class="flex flex-wrap -mx-2">
        <div
          v-for="card in cards"
          :key="card.id"
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer"
          @click="openModal(card)"
        >
          <div class="p-4 rounded-lg shadow-md hover:shadow-xl transition">
            <img :src="card.images.small" :alt="card.name" />
            <div class="flex justify-between mt-4">
              <button class="btn-1">See Pokémon card</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- pagination -->
    <div class="flex justify-center gap-4 mt-6" v-if="cards.length > 0">
      <button class="btn-1" @click="prevPage" :disabled="page <= 1">Prev</button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button class="btn-1" @click="nextPage" :disabled="page >= totalPages">Next</button>
    </div>

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
import { ref, onMounted, watch, computed } from 'vue';
import { useCards } from '../modules/useCards';
import CardModal from '../components/CardModal.vue';
import type { PokemonCard } from '../interfaces/card';

const { loading, error, cards, fetchCards, totalCount } = useCards();

const searchQuery = ref('');
const selectedSupertype = ref('');
const page = ref(1);
const pageSize = 20;
const sortBy = ref('');
const selectedCard = ref<PokemonCard | null>(null);
const showModal = ref(false);

const totalPages = computed(() => Math.ceil(totalCount.value / pageSize));

const fetchFilteredCards = () => {
  fetchCards(searchQuery.value, selectedSupertype.value, page.value, sortBy.value);
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    fetchFilteredCards();
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchFilteredCards();
  }
};

const openModal = (card: PokemonCard) => {
  selectedCard.value = card;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(() => {
  fetchFilteredCards();
});

watch([searchQuery, selectedSupertype], () => {
  page.value = 1;
  fetchFilteredCards();
});
</script>

<style scoped>
/* Optional spinner or animation */
</style>
