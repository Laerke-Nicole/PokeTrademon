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



    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, computed } from 'vue';
  import { useUsers } from '../modules/auth/userModels';
  import type { TradeOffer, TradeCard } from '../interfaces/trade';
  import { fetchTradesForUser, createTradeOffer } from '../modules/tradeApi';

  const { user } = useUsers(); // You should already be storing the logged-in user
  
  const allTrades = ref<TradeOffer[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
    const receiverId = ref('');
const senderCardsRaw = ref('');
const receiverCardsRaw = ref('');
  
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

  const parseCards = (input: string): TradeCard[] => {
  return input
    .split(',')
    .map(entry => {
      const [cardId, qty] = entry.split(':');
      return {
        cardId: cardId.trim(),
        quantity: Number(qty.replace(/[^\d]/g, '') || 1),
      };
    })
    .filter(card => card.cardId);
};

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

  </script>
  