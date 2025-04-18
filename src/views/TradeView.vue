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
      <div class="border p-4 rounded mb-6">
  <h2 class="text-xl font-semibold mb-2">Create a Trade Offer, Option 1</h2>

  <div class="mb-2">
    <label class="block font-medium mb-1">Receiver ID:</label>
    <input v-model="receiverId" type="text" class="w-full p-2 border rounded" />
  </div>

  <div class="mb-2">
    <label class="block font-medium mb-1">Your Cards (to offer):</label>
    <input v-model="senderCardsRaw" placeholder="cardId:x1,cardId2:x2" class="w-full p-2 border rounded" />
  </div>

  <div class="mb-2">
    <label class="block font-medium mb-1">Requested Cards:</label>
    <input v-model="receiverCardsRaw" placeholder="cardId:x1,cardId2:x2" class="w-full p-2 border rounded" />
  </div>

  <button @click="submitTrade" class="btn-1 mt-2">Send Trade</button>
</div>

<h2 class="text-xl font-semibold mt-10 mb-2">Select from My Collection (Option 2)</h2>

<div v-if="userCards.length === 0">
  <p>You don't own any cards.</p>
</div>
<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  <div v-for="card in userCards" :key="card.cardId" class="border p-4 rounded">
    <p><strong>Card ID:</strong> {{ card.cardId }}</p>
    <p><strong>Quantity:</strong> {{ card.quantity }}</p>
    <button class="btn-1 mt-2" @click="selectCardForTrade(card)">Propose Trade</button>
  </div>
</div>

<!-- Modal Trade Form -->
<div v-if="selectedCardForTrade" class="mt-6 border p-4 rounded bg-gray-50">
  <h3 class="text-lg font-semibold mb-2">
    Create Offer for: {{ selectedCardForTrade.cardId }}
  </h3>
  <form @submit.prevent="submitSelectedCardTrade" class="space-y-2">
    <input
      v-model="receiverIdInput"
      placeholder="Receiver's User ID"
      class="input w-full"
    />
    <input
      v-model="receiverCardIdInput"
      placeholder="Receiver's Card ID"
      class="input w-full"
    />
    <input
      type="number"
      v-model.number="receiverQuantityInput"
      min="1"
      placeholder="Quantity to request"
      class="input w-full"
    />
    <div class="flex gap-4">
      <button type="submit" class="btn-1">Send Offer</button>
      <button type="button" class="btn-1" @click="cancelSelectedTrade">Cancel</button>
    </div>
  </form>
</div>



    </div>
  </template>
  
  <script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useUsers } from '../modules/auth/userModels';
import type { TradeOffer, TradeCard } from '../interfaces/trade';
import { fetchTradesForUser, createTradeOffer, fetchUserCollection } from '../modules/tradeApi';

// Auth / User
const { user } = useUsers();
const currentUserId = computed(() => user.value?._id ?? localStorage.getItem("userIDToken"));

// State
const allTrades = ref<TradeOffer[]>([]);
const userCards = ref<TradeCard[]>([]);
const selectedCardForTrade = ref<TradeCard | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Form Inputs (Option 1)
const receiverId = ref('');
const senderCardsRaw = ref('');
const receiverCardsRaw = ref('');

// Form Inputs (Option 2)
const receiverIdInput = ref('');
const receiverCardIdInput = ref('');
const receiverQuantityInput = ref(1);

// Trade lists
const incoming = computed(() =>
  allTrades.value.filter(t => t.receiverId?.toString() === currentUserId.value)
);
const outgoing = computed(() =>
  allTrades.value.filter(t => t.senderId?.toString() === currentUserId.value)
);

// Format card list for display
const cardList = (cards: TradeCard[]) =>
  cards.map(c => `${c.cardId} (x${c.quantity})`).join(', ');

// On load: fetch trades and collection
onMounted(async () => {
  try {
    const userId = currentUserId.value;
    if (!userId) throw new Error("User not found");

    const [trades, collection] = await Promise.all([
      fetchTradesForUser(userId),
      fetchUserCollection(userId)
    ]);

    allTrades.value = trades;
    userCards.value = collection;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load data';
  } finally {
    loading.value = false;
  }
});

// Parse raw input into TradeCard[]
const parseCards = (input: string): TradeCard[] => {
  return input
    .split(',')
    .map(entry => {
      const [cardId, qty] = entry.split(':');
      return {
        cardId: cardId.trim(),
        quantity: Number(qty?.replace(/[^\d]/g, '') || 1),
      };
    })
    .filter(card => card.cardId);
};

// Submit from Option 1 (raw text form)
const submitTrade = async () => {
  if (!user.value?._id || !receiverId.value) {
    alert("Missing user or receiver ID");
    return;
  }

  const senderCards = parseCards(senderCardsRaw.value);
  const receiverCards = parseCards(receiverCardsRaw.value);

  try {
    await createTradeOffer({
      senderId: user.value._id,
      receiverId: receiverId.value,
      senderCards,
      receiverCards
    });

    alert("Trade offer sent!");
    senderCardsRaw.value = '';
    receiverCardsRaw.value = '';
    receiverId.value = '';
  } catch (err) {
    console.error("Failed to create trade", err);
    alert("Failed to send trade.");
  }
};

// Option 2 — From selected card in your collection
const selectCardForTrade = (card: TradeCard) => {
  selectedCardForTrade.value = card;
};

const cancelSelectedTrade = () => {
  selectedCardForTrade.value = null;
  receiverIdInput.value = '';
  receiverCardIdInput.value = '';
  receiverQuantityInput.value = 1;
};

const submitSelectedCardTrade = async () => {
  if (!user.value?._id || !selectedCardForTrade.value) return;

  try {
    await createTradeOffer({
      senderId: user.value._id,
      receiverId: receiverIdInput.value,
      senderCards: [{ ...selectedCardForTrade.value }],
      receiverCards: [{ cardId: receiverCardIdInput.value, quantity: receiverQuantityInput.value }],
    });

    alert('Trade offer sent!');
    cancelSelectedTrade();

    // Refresh trades
    const result = await fetchTradesForUser(user.value._id);
    allTrades.value = result;
  } catch (err) {
    alert('Failed to send offer.');
    console.error(err);
  }
};
</script>
