<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-100 to-blue-100 pt-32 pb-10">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Header -->
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-10">My Trade Offers</h1>
  
        <!-- Tabs -->
        <div class="flex justify-center mb-6 space-x-4">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="() => (activeTab = tab)"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium',
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
            ]"
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }} Offers
          </button>
        </div>
  
        <!-- Trade Lists -->
        <div v-if="activeTab === 'incoming'">
          <div v-if="incoming.length === 0" class="text-center text-gray-600">No incoming offers yet.</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="trade in incoming"
              :key="trade._id"
              class="bg-white p-4 rounded-xl shadow-md border border-gray-200"
            >
              <div class="flex justify-between mb-2">
                <div class="font-semibold text-gray-800">From: {{ trade.senderId.username }}</div>
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full font-semibold',
                    trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  ]"
                >
                  {{ trade.status }}
                </span>
              </div>
              <p class="text-sm text-gray-700"><strong>They offer:</strong> {{ cardList(trade.senderCards) }}</p>
              <p class="text-sm text-gray-700"><strong>They want:</strong> {{ cardList(trade.receiverCards) }}</p>
              <div v-if="trade.status === 'pending'" class="mt-4 flex space-x-2">
                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-sm" @click="acceptTrade(trade._id)">Accept</button>
                <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm" @click="declineTrade(trade._id)">Decline</button>
              </div>
            </div>
          </div>
        </div>
  
        <div v-else-if="activeTab === 'outgoing'">
          <div v-if="outgoing.length === 0" class="text-center text-gray-600">No outgoing offers yet.</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="trade in outgoing"
              :key="trade._id"
              class="bg-white p-4 rounded-xl shadow-md border border-gray-200"
            >
              <div class="flex justify-between mb-2">
                <div class="font-semibold text-gray-800">To: {{ trade.receiverId.username }}</div>
                <span
                  :class="[
                    'text-xs px-2 py-1 rounded-full font-semibold',
                    trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  ]"
                >
                  {{ trade.status }}
                </span>
              </div>
              <p class="text-sm text-gray-700"><strong>You offer:</strong> {{ cardList(trade.senderCards) }}</p>
              <p class="text-sm text-gray-700"><strong>You want:</strong> {{ cardList(trade.receiverCards) }}</p>
            </div>
          </div>
        </div>
  
        <div v-else class="text-center text-gray-600">Completed trades will be shown here.</div>
  
       <!-- Make Trade Offer -->
<div v-if="userId" class="mt-16">
  <h2 class="text-2xl font-bold text-gray-800 mb-4">Create a Trade Offer</h2>
  <form @submit.prevent="submitTrade" class="space-y-4">
    <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Receiver Username:</label>
        <input
  v-model="username"
  placeholder="Receiver Username:"
  class="rounded p-2 border w-full"
/>
<p v-if="userExists === true" class="text-green-600 text-sm mt-1">✅ User exists</p>
<p v-else-if="userExists === false" class="text-red-600 text-sm mt-1">❌ User not found</p>

    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Your Cards (e.g. card1:x1,card2:x2):</label>
      <input v-model="senderCardsRaw" type="text" class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Requested Cards (e.g. card1:x1,card2:x2):</label>
      <input v-model="receiverCardsRaw" type="text" class="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300" />
    </div>
    <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Send Trade Offer</button>
  </form>
</div>

      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { TradeOffer, TradeCard } from '../interfaces/trade';
import { useUsers } from '../modules/auth/userModels';
import {
  acceptTradeOffer,
  declineTradeOffer,
  fetchTradesForUser,
  createTradeOffer
} from '../modules/tradeApi';

// ─── Tabs ─────────────────────────────────────
const tabs = ['incoming', 'outgoing', 'completed'] as const;
type TabType = (typeof tabs)[number];
const activeTab = ref<TabType>('incoming');

// ─── Auth & User ──────────────────────────────
const { user } = useUsers();
const userId = computed(() => user?.value?._id ?? localStorage.getItem("userIDToken") ?? '');

// ─── Trades ───────────────────────────────────
const allTrades = ref<TradeOffer[]>([]);
const incoming = computed(() => allTrades.value.filter(t => t.receiverId._id === userId.value));
const outgoing = computed(() => allTrades.value.filter(t => t.senderId._id === userId.value));

// ─── Helper for card display ──────────────────
const cardList = (cards: TradeCard[]) => cards.map(c => `${c.cardId} (x${c.quantity})`).join(', ');

// ─── Trade Form ───────────────────────────────
const username = ref('');
const senderCardsRaw = ref('');
const receiverCardsRaw = ref('');

// ─── Live Username Check ──────────────────────
const userExists = ref<null | boolean>(null);

watch(username, debounce(async (val: string) => {
    if (val.trim()) {
    try {
      const res = await fetch(`/api/users/check?username=${val}`);
      const data = await res.json();
      userExists.value = data.exists;
    } catch (err) {
      console.error('User check failed:', err);
      userExists.value = false;
    }
  } else {
    userExists.value = null;
  }
}, 500));

function debounce<T extends (arg: string) => unknown>(fn: T, delay: number): (arg: string) => void {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: [string]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }) as T;
}


// ─── Parse Cards ──────────────────────────────
const parseCards = (input: string): TradeCard[] =>
  input.split(',').map((entry) => {
    const [cardId, qty] = entry.split(':');
    return {
      cardId: cardId.trim(),
      quantity: Number(qty || 1),
      name: '',
      image: ''
    };
  }).filter(c => c.cardId);

// ─── Create Trade ─────────────────────────────
const submitTrade = async () => {
    if (!userId.value || !username.value || userExists.value !== true) return;
    await createTradeOffer({
  senderId: userId.value,
  receiverUsername: username.value,
  senderCards: parseCards(senderCardsRaw.value),
  receiverCards: parseCards(receiverCardsRaw.value)
});

  senderCardsRaw.value = '';
  receiverCardsRaw.value = '';
  userExists.value = null;
  await loadTrades();
};

// ─── Load / Accept / Decline Trades ───────────
const loadTrades = async () => {
  if (!userId.value) return;
  allTrades.value = await fetchTradesForUser(userId.value);
};
loadTrades();

const acceptTrade = async (id: string) => {
  await acceptTradeOffer(id);
  await loadTrades();
};

const declineTrade = async (id: string) => {
  await declineTradeOffer(id);
  await loadTrades();
};
</script>

  
  <style scoped>
  h1 {
    font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
  }
  </style>
  