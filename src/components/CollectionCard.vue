<template>
  <div class="border p-4 round-corner shadow relative light-bg" v-motion-fade-slide>
    <img :src="card.image" alt="Card" class="w-full pb-2" />
    <p class="text-center py-2"><strong>Card id:</strong> {{ card.cardId.trim() }}</p>

    <!-- Inline Editing Fields -->
    <div class="flex justify-between items-center pt-2">
      <div>
        <label class="text-sm pr-2">Qty:</label>
        <input
          type="number"
          v-model.number="localCard.quantity"
          class="w-12 pl-1 p-1 border round-corner text-sm white-bg"
        />
      </div>
      <div>
        <label class="text-sm pr-2">Cond:</label>
        <select v-model="localCard.condition" class="pl-1 p-1 border round-corner text-sm white-bg">
          <option value="mint">Mint</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between pt-3">
      <button class="btn-1 text-sm px-2 py-1" @click="handleUpdate">Update</button>
      <button class="btn-1 text-sm px-2 py-1 bg-red-500 hover:bg-red-600" @click="handleDelete">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue'

interface Card {
  cardId: string
  quantity: number
  condition: string
  image: string
}

const props = defineProps<{ card: Card }>()
const emit = defineEmits<{
  (e: 'update', cardId: string, quantity: number, condition: string): void
  (e: 'delete', cardId: string): void
}>()

const localCard = ref({ ...props.card })

watch(
  () => props.card,
  (newVal) => {
    localCard.value = { ...newVal }
  },
)

const handleUpdate = () => {
  emit('update', localCard.value.cardId, localCard.value.quantity, localCard.value.condition)
}

const handleDelete = () => {
  emit('delete', localCard.value.cardId)
}
</script>

<style scoped>
/* optional: transition or hover effects */
</style>
