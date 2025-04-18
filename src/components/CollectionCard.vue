<template>
    <div class="border p-4 rounded shadow relative">
      <img :src="card.image" alt="Card" class="w-full mb-2" />
      <p class="text-center font-semibold">{{ card.cardId }}</p>
  
      <!-- Inline Editing Fields -->
      <div class="flex justify-between items-center mt-2">
        <div>
          <label class="text-sm">Qty:</label>
          <input type="number" v-model.number="localCard.quantity" class="w-12 ml-1 p-1 border rounded text-sm" />
        </div>
        <div>
          <label class="text-sm">Cond:</label>
          <select v-model="localCard.condition" class="ml-1 p-1 border rounded text-sm">
            <option value="mint">Mint</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
          </select>
        </div>
      </div>
  
      <!-- Action Buttons -->
      <div class="flex justify-between mt-3">
        <button class="btn-1 text-sm px-2 py-1" @click="handleUpdate">Update</button>
        <button class="btn-1 text-sm px-2 py-1 bg-red-500 hover:bg-red-600" @click="handleDelete">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  
  interface CollectionCardProps {
    card: {
      cardId: string;
      quantity: number;
      condition: string;
      image: string;
    };
    onUpdate: (cardId: string, quantity: number, condition: string) => void;
    onDelete: (cardId: string) => void;
  }
  
  const props = defineProps<CollectionCardProps>();
  
  const localCard = ref({ ...props.card });
  
  watch(() => props.card, (newVal) => {
    localCard.value = { ...newVal };
  });
  
  const handleUpdate = () => {
    props.onUpdate(localCard.value.cardId, localCard.value.quantity, localCard.value.condition);
  };
  
  const handleDelete = () => {
    props.onDelete(localCard.value.cardId);
  };
  </script>
  
  <style scoped>
  /* optional: transition or hover effects */
  </style>
  