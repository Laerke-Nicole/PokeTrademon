<template>
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
          <span
            v-if="mode === 'select' && selectedCards?.[card.id]"
            class="absolute top-3 left-3 bg-blue-500 light-headline text-xs px-2 py-0.5 round-corner"
          >
            x{{ selectedCards[card.id] }}
          </span>
          <div class="pt-4 flex justify-between items-center">
            <button
              class="btn-1"
              @click="$emit('card-click', card)"
              data-testid="select-card-button"
            >
              {{ mode === 'select' ? 'Select Card' : 'See Card' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokemonCard } from '@/interfaces/card'

defineProps<{
  loading: boolean
  error: string | null
  cards: PokemonCard[]
  selectedCards?: Record<string, number>
  mode: 'select' | 'view'
}>()

defineEmits<{
  (e: 'card-click', card: PokemonCard): void
}>()
</script>
