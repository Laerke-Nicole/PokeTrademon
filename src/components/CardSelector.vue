<template>
  <div class="card-selector">
    <!-- Selected Cards Preview -->
    <div
      v-if="mode === 'select' && props.selectedCards && Object.keys(props.selectedCards).length > 0"
      class="pb-6"
    >
      <h3 class="text-md font-semibold dark-headline pb-2" v-motion-fade-slide></h3>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="(qty, cardId) in props.selectedCards"
          :key="cardId"
          class="relative border round-corner p-2 bg-white shadow-sm"
        >
          <span
            class="absolute -top-2 -right-2 bg-red-500 light-headline round-corner w-5 h-5 text-xs flex items-center justify-center cursor-pointer"
            @click="emit('card-removed', cardId)"
            >×</span
          >
          <div class="text-sm font-medium dark-headline">ID: {{ cardId.trim() }}</div>
          <div class="text-xs dark-text">Qty: {{ qty }}</div>
        </div>
      </div>
    </div>
    <div class="pb-4">
      <button
        class="text-sm text-blue-600 hover:text-blue-700 cursor-pointer pb-2"
        @click="showGrid = !showGrid"
      >
        {{ showGrid ? 'Hide card list' : 'Show card list' }}
      </button>
    </div>

    <!-- Search & Filters -->
    <div v-if="showGrid">
      <div class="flex flex-col md:flex-row gap-4 pb-6">
        <input
          type="text"
          placeholder="Search Pokémon..."
          class="p-2 border round-corner white-bg dark-text"
          v-model="searchQuery"
          @input="fetchFilteredCards"
          data-testid="search-input"
        />

        <select
          v-model="selectedSupertype"
          @change="fetchFilteredCards"
          class="p-2 border white-bg round-corner dark-text"
        >
          <option value="">All Supertypes</option>
          <option value="Pokémon">Pokémon</option>
          <option value="Trainer">Trainer</option>
          <option value="Energy">Energy</option>
        </select>

        <select
          v-model="sortBy"
          @change="fetchFilteredCards"
          class="p-2 border rounded white-bg round-corner dark-text"
        >
          <option value="">Sort by</option>
          <option value="name">Name (A–Z)</option>
          <option value="-name">Name (Z–A)</option>
          <option value="hp">HP (Low–High)</option>
          <option value="-hp">HP (High–Low)</option>
          <option value="rarity">Rarity</option>
          <option value="set.name">Set Name</option>
        </select>
      </div>

      <!-- Card Grid -->
      <div>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else-if="!cards.length">No cards found.</div>
        <div v-else class="flex flex-wrap -mx-2">
          <div
            v-for="card in cards"
            :key="card.id"
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 cursor-pointer relative"
            v-motion-fade-slide
          >
            <div class="p-4 rounded-lg shadow hover:shadow-lg transition light-bg">
              <img :src="card.images.small" :alt="card.name" class="w-full" />

              <!-- Optional Quantity badge -->
              <span
                v-if="mode === 'select' && props.selectedCards?.[card.id]"
                class="absolute top-3 left-3 bg-blue-500 light-headline text-xs px-2 py-0.5 round-corner"
              >
                x{{ props.selectedCards[card.id] }}
              </span>

              <div class="pt-4 flex justify-between items-center">
                <button
                  class="btn-1"
                  @click="handleCardClick(card)"
                  data-testid="select-card-button"
                >
                  {{ mode === 'select' ? 'Select Card' : 'See Card'.trim() }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center gap-4 pt-6" v-if="cards.length > 0">
        <button class="btn-1" @click="prevPage" :disabled="page <= 1">Prev</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button class="btn-1" @click="nextPage" :disabled="page >= totalPages">Next</button>
      </div>
    </div>

    <!-- Modal Preview (only in view mode) -->
    <CardModal
      v-if="mode === 'view' && showModal && selectedCard"
      :visible="showModal"
      :card="selectedCard"
      @close="showModal = false"
      @add-to-collection="handleAddToCollection"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import CardModal from './CardModal.vue'
import { useCards } from '../modules/useCards'
import type { PokemonCard } from '../interfaces/card'
import { useCollection } from '../modules/useCollection'
const { addCardToCollection } = useCollection()

const handleAddToCollection = async (cardId: string) => {
  const uid = localStorage.getItem('userIDToken')?.replace(/"/g, '')
  if (!uid) return alert('Login required')
  await addCardToCollection(cardId)
}

const props = defineProps<{
  mode?: 'select' | 'view'
  selectedCards?: Record<string, number>
}>()

const emit = defineEmits<{
  (e: 'card-selected', card: PokemonCard): void
  (e: 'card-removed', cardId: string): void
}>()

const mode = props.mode || 'view'
const showGrid = ref(true)

const { loading, error, cards, fetchCards, totalCount } = useCards()

const searchQuery = ref('')
const selectedSupertype = ref('')
const sortBy = ref('')
const page = ref(1)
const pageSize = 20

const selectedCard = ref<PokemonCard | null>(null)
const showModal = ref(false)

const totalPages = computed(() => Math.ceil(totalCount.value / pageSize))

const fetchFilteredCards = () => {
  fetchCards(searchQuery.value, selectedSupertype.value, page.value, sortBy.value)
}

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++
    fetchFilteredCards()
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    fetchFilteredCards()
  }
}

const handleCardClick = (card: PokemonCard) => {
  if (mode === 'select') {
    // Toggle support (optional)
    if (props.selectedCards?.[card.id]) {
      emit('card-removed', card.id)
    } else {
      emit('card-selected', card)
    }
  } else {
    selectedCard.value = card
    showModal.value = true
  }
}

onMounted(() => {
  fetchFilteredCards()
})

watch([searchQuery, selectedSupertype], () => {
  page.value = 1
  fetchFilteredCards()
})

watch(
  () => props.mode,
  (newMode) => {
    if (newMode === 'select') {
      showModal.value = false
      selectedCard.value = null
    }
  },
)
</script>

<style scoped></style>
