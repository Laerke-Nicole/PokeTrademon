<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white max-w-2xl w-full rounded-xl shadow-lg overflow-hidden">
      <div class="flex justify-between items-center px-4 py-3 border-b">
        <h2 class="text-lg font-semibold">Browse Open Trade Offers</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      <div class="p-4">
        <div v-if="loading" class="text-center text-gray-600">Loading offers...</div>
        <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
        <div v-else-if="offers.length === 0" class="text-center text-gray-600">No open offers available.</div>
        <div v-else class="space-y-4 max-h-[60vh] overflow-y-auto">
          <div
            v-for="trade in offers"
            :key="trade._id"
            class="border p-4 rounded-lg shadow-sm flex flex-col gap-2"
          >
            <p><strong>From:</strong> {{ trade.senderId?.username || 'Unknown' }}</p>
            <p><strong>They offer:</strong> {{ formatCards(trade.senderCards) }}</p>
            <p><strong>They want:</strong> {{ formatCards(trade.receiverCards) }}</p>

            <div class="flex gap-2 mt-2">
              <button
                v-if="trade.senderId?._id !== currentUserId"
                @click="$emit('accept', trade._id)"
                class="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
              >
                Accept
              </button>
              <button
                v-else
                @click="$emit('decline', trade._id)"
                class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Cancel Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TradeCard, TradeOffer } from '../interfaces/trade';

defineProps<{
  visible: boolean;
  offers: TradeOffer[];
  loading: boolean;
  error: string | null;
  currentUserId: string;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'accept', tradeId: string): void;
  (e: 'decline', tradeId: string): void;
}>();

const formatCards = (cards: TradeCard[]): string =>
  cards.map(c => `${c.cardId} (x${c.quantity})`).join(', ');
</script>

<style scoped>
/* Add modal transitions or styles as needed */
</style>
