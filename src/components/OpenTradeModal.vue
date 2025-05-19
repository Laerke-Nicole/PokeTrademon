<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white max-w-2xl w-full rounded-xl shadow-lg overflow-hidden">
      <div class="flex justify-between items-center px-4 py-3 border-b">
        <h2 class="text-lg font-semibold">Browse Open Trade Offers</h2>
        <button @click="$emit('close')" aria-label="Close modal" class="text-gray-500 hover:text-gray-700">&times;</button>
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
            <p><strong>From:</strong> {{ trade.senderId?.username || 'Unknown'.trim() }}</p>
            <div>
              <p class="font-semibold">They offer:</p>
              <div class="flex flex-wrap gap-2 mb-2">
                <div
                  v-for="c in trade.senderCards"
                  :key="c.cardId"
                  class="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                >
                  <img :src="c.image" alt="card" class="h-8 w-8 object-contain" />
                  <span>{{ c.name }} (x{{ c.quantity }})</span>
                </div>
              </div>

              <p class="font-semibold">They want:</p>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="c in trade.receiverCards"
                  :key="c.cardId"
                  class="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded"
                >
                  <img :src="c.image" alt="card" class="h-8 w-8 object-contain" />
                  <span>{{ c.name }} (x{{ c.quantity }})</span>
                </div>
              </div>
            </div>


            <div class="flex gap-2 mt-2 items-center">
              <button
                v-if="trade.senderId?._id !== currentUserId"
                @click="$emit('accept', trade._id)"
                :disabled="!canTrade(trade)"
                class="px-4 py-1 rounded text-white"
                :class="canTrade(trade) ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'"
              >
                Accept
              </button>
              <span v-if="trade.senderId?._id !== currentUserId && !canTrade(trade)" class="text-sm text-red-500">
                You don't have the necessary cards to make this trade
              </span>
              <button
                v-else-if="trade.senderId?._id === currentUserId"
                @click="$emit('decline', trade._id, currentUserId)"
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

const props = defineProps<{
  visible: boolean;
  offers: TradeOffer[];
  loading: boolean;
  error: string | null;
  currentUserId: string;
  userCollection: TradeCard[];
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'accept', tradeId: string): void;
  (e: 'decline', tradeId: string, userId: string): void;
}>();

/* const formatCards = (cards: TradeCard[]): string =>
  cards.map(c => `${c.name} (x${c.quantity})`).join(', '); */

const canTrade = (trade: TradeOffer): boolean => {
  return trade.receiverCards.every(reqCard => {
    const userCard = props.userCollection.find(c => c.cardId === reqCard.cardId);
    return userCard && userCard.quantity >= reqCard.quantity;
  });
};
</script>
