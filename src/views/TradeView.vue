<template>
    <div class="pt-20 five-percent">
      <h1 class="text-2xl font-bold mb-4">My Trade Offers</h1>
  
      <div v-if="loading">Loading trades...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div v-if="incoming.length === 0 && outgoing.length === 0">
          <p>No trades yet.</p>
        </div>
  
        <div v-if="incoming.length > 0">
          <h2 class="text-xl font-semibold mt-4 mb-2">Incoming Offers</h2>
          <div v-for="trade in incoming" :key="trade._id" class="border p-4 mb-2 rounded">
            <p><strong>From:</strong> {{ trade.senderId }}</p>
            <p><strong>They offer:</strong> {{ cardList(trade.senderCards) }}</p>
            <p><strong>They want:</strong> {{ cardList(trade.receiverCards) }}</p>
            <p><strong>Status:</strong> {{ trade.status }}</p>
          </div>
        </div>
  
        <div v-if="outgoing.length > 0">
          <h2 class="text-xl font-semibold mt-6 mb-2">Outgoing Offers</h2>
          <div v-for="trade in outgoing" :key="trade._id" class="border p-4 mb-2 rounded">
            <p><strong>To:</strong> {{ trade.receiverId }}</p>
            <p><strong>You offer:</strong> {{ cardList(trade.senderCards) }}</p>
            <p><strong>You want:</strong> {{ cardList(trade.receiverCards) }}</p>
            <p><strong>Status:</strong> {{ trade.status }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { useUsers } from '../modules/auth/userModels';
  import type { TradeOffer, TradeCard } from '../interfaces/trade';
  import { fetchTradesForUser } from '../modules/tradeApi';
  
  const { user } = useUsers(); // You should already be storing the logged-in user
  
  const allTrades = ref<TradeOffer[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  
  const currentUserId = computed(() => (user.value?._id ?? localStorage.getItem("userIDToken"))?.toString());
  console.log("User ID in computed:", currentUserId.value);
console.log("All trades:", allTrades.value);

  const incoming = computed(() =>
  allTrades.value.filter(t => t.receiverId?.toString() === currentUserId.value)
);

const outgoing = computed(() =>
  allTrades.value.filter(t => t.senderId?.toString() === currentUserId.value)
);


  
  const cardList = (cards: TradeCard[]) =>
    cards.map(c => `${c.cardId} (x${c.quantity})`).join(', ');
  
  onMounted(async () => {
    try {
        const userId = user.value?._id || localStorage.getItem("userIDToken");
if (!userId) throw new Error("User not found");
const result = await fetchTradesForUser(userId);

      allTrades.value = result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Failed to fetch trades';
      }
    } finally {
      loading.value = false;
    }
  });
  </script>
  