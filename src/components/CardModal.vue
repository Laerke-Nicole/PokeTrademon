<template>
    <div v-if="visible" class="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-lg w-11/12 max-w-md relative">
        <button class="absolute top-2 right-2 text-gray-600" @click="close">✖</button>
        <h2 class="text-xl font-bold mb-4">{{ card.name }}</h2>
        <img :src="card.images.large || card.images.small" alt="Card Image" class="mx-auto mb-4" />
        <p><strong>Supertype:</strong> {{ card.supertype }}</p>
        <p v-if="card.subtypes"><strong>Subtype:</strong> {{ card.subtypes.join(', ') }}</p>
        <p v-if="card.rarity"><strong>Rarity:</strong> {{ card.rarity }}</p>
        <p v-if="card.hp"><strong>HP:</strong> {{ card.hp }}</p>
        <p v-if="card.set"><strong>Set:</strong> {{ card.set.name }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import type { PokemonCard } from '../interfaces/card'; // ✅ Import the interface

defineProps<{
  visible: boolean;
  card: PokemonCard;
}>();

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

  
  <style scoped>
  /* optional transitions or animations */
  </style>
  