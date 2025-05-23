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
  

    <!-- Only show the toggle if on TradeView -->
    <div class="pb-4" v-if="route.name === 'trade'">
      <button
        class="text-sm text-blue-600 hover:text-blue-700 cursor-pointer pb-2"
        @click="showGrid = !showGrid"
        aria-label="Toggle card list visibility"
      >
        {{ showGrid ? 'Hide card list' : 'Show card list' }}
      </button>
    </div>

    <div v-if="showGrid" class="pt-6">
      <!-- Search & Filters -->
      <CardFilterBar
        :searchQuery="searchQuery"
        :selectedSupertype="selectedSupertype"
        :sortBy="sortBy"
        @update:searchQuery="(val) => updateAndFetch('searchQuery', val)"
        @update:selectedSupertype="(val) => updateAndFetch('selectedSupertype', val)"
      />
        <!-- @update:sortBy="(val) => updateAndFetch('sortBy', val)" -->


     <!-- Card Grid -->
<CardGridState
  :loading="loading"
  :error="error"
  :cards="cards"
  :selectedCards="props.selectedCards"
  :mode="mode"
  @card-click="handleCardClick"
/>

<!-- Pagination -->
<CardPagination
  :currentPage="page"
  :totalPages="totalPages"
  @prev="prevPage"
  @next="nextPage"
/>


    <!-- Modal Preview -->
    <CardModal
      v-if="mode === 'view' && showModal && selectedCard"
      :visible="showModal"
      :card="selectedCard"
      @close="showModal = false"
      @add-to-collection="handleAddToCollection"
      @notify="emit('notify', $event)"
    />
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import type { PokemonCard } from '../../interfaces/card'
import { useCards } from '../../modules/useCards'
import { useMarketActions } from '../../modules/useMarketActions'
import CardModal from './CardModal.vue'
import CardFilterBar from './CardFilterBar.vue'
import CardPagination from './CardPagination.vue'
import CardGridState from './CardGridState.vue'
import { useRoute } from 'vue-router'

const { handleAddToCollection } = useMarketActions()
const route = useRoute()

const props = defineProps<{
  mode?: 'select' | 'view'
  selectedCards?: Record<string, number>
}>()

const emit = defineEmits<{
  (e: 'card-selected', card: PokemonCard): void
  (e: 'card-removed', cardId: string): void
  (e: 'notify', message: string): void
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

const updateAndFetch = (key: 'searchQuery' | 'selectedSupertype' | 'sortBy', val: string) => {
  if (key === 'searchQuery') searchQuery.value = val
  if (key === 'selectedSupertype') selectedSupertype.value = val
  if (key === 'sortBy') sortBy.value = val
  page.value = 1
  fetchFilteredCards()
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

onMounted(fetchFilteredCards)

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
