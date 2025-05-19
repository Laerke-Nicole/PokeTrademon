<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-100 to-blue-100 pt-32 pb-10">
     
      
      <ToastView ref="toastRef" />


    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-10" data-testid="my-trade-offers">My Trade Offers</h1>

      <!-- Tabs -->
      <div class="flex justify-center mb-6 space-x-4 items-center">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium',
            activeTab === tab ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
          ]"
        >
          {{ tab.charAt(0).toUpperCase() + tab.slice(1).trim() }} Offers
        </button>
        <button class="text-blue-600 underline text-sm" @click="openMarketplace">Browse Open Offers</button>
      </div>
  
        <!-- Offer Lists -->
        <div v-if="activeTab === 'incoming'">
          <div v-if="incoming.length === 0" class="text-center text-gray-600">No incoming offers yet.</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="trade in incoming" :key="trade._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between mb-2">
                <div class="font-semibold text-gray-800">From: {{ trade.senderId.username.trim() }}</div>
                <span :class="['text-xs px-2 py-1 rounded-full font-semibold', trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">
                  {{ trade.status.trim() }}
                </span>
              </div>
              <p class="text-sm text-gray-700"><strong>They offer:</strong> {{ cardList(trade.senderCards).trim() }}</p>
              <p class="text-sm text-gray-700"><strong>They want:</strong> {{ cardList(trade.receiverCards).trim() }}</p>
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
            <div v-for="trade in outgoing" :key="trade._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between mb-2">
                <div class="font-semibold text-gray-800">To: {{ trade.receiverId?.username || 'Anyone (Open)'.trim() }}</div>
                <span :class="['text-xs px-2 py-1 rounded-full font-semibold', trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">
                  {{ trade.status.trim() }}
                </span>
              </div>
              <p class="text-sm text-gray-700"><strong>You offer:</strong> {{ cardList(trade.senderCards).trim() }}</p>
              <p class="text-sm text-gray-700"><strong>You want:</strong> {{ cardList(trade.receiverCards).trim() }}</p>
            </div>
          </div>
        </div>
  
        <div v-else class="text-center text-gray-600">Completed trades will be shown here.</div>
  
        <!-- Trade Form -->
        <div v-if="userId" class="mt-16">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Create a Trade Offer</h2>
  
          <!-- Mode Toggle -->
          <div class="mb-4 flex gap-4 items-center">
            <label class="flex items-center gap-2">
              <input type="radio" value="direct" v-model="tradeMode" data-testid="direct-toggle"/> Direct
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="open" v-model="tradeMode" /> Open
            </label>
          </div>
  
          <!-- Username -->
          <div v-if="tradeMode === 'direct'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Receiver Username:</label>
            <input v-model="username" placeholder="Receiver Username" class="rounded p-2 border w-full" data-testid="receiver-username"/>
            <p v-if="userExists === true" class="text-green-600 text-sm mt-1">✅ User exists</p>
            <p v-else-if="userExists === false" class="text-red-600 text-sm mt-1">❌ User not found</p>
          </div>
  
          <!-- Sender Cards -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Select Your Cards:</label>
            <div class="flex items-center gap-3 mb-2">
              <select v-model="selectedCardId" class="border rounded p-1" data-testid="user-card-dropdown">
                <option disabled value="">-- Choose a card --</option>
                <option v-for="card in userCollection" :key="card.cardId" :value="card.cardId" :disabled="card.quantity === 0">
                  {{ card.cardId.trim() }} (You have: {{ card.quantity }})
                </option>
              </select>
              <input type="number" v-model.number="selectedQuantity" :min="1" :max="getCardMax(selectedCardId)" class="w-20 p-1 border rounded" :disabled="!selectedCardId" />
              <button @click="addCardToSelection" class="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50" :disabled="!selectedCardId || selectedQuantity < 1" data-testid="user-card-add">Add</button>
            </div>
            <ul class="text-sm text-gray-800 ml-1">
              <li v-for="(qty, id) in selectedSender" :key="id" class="flex justify-between items-center w-60">
                {{ id.trim() }} (x{{ qty }})
                <button @click="removeCard(id)" class="text-red-600 text-xs ml-2">Remove</button>
              </li>
            </ul>
          </div>
  
          <!-- Receiver Cards -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Select Requested Cards:</h3>
            <CardSelector mode="select" :selected-cards="selectedReceiverCards" @card-selected="addReceiverCard" @card-removed="removeReceiverCard" />
            <ul class="text-sm text-gray-800 mt-4 ml-1">
              <li v-for="(qty, id) in selectedReceiverCards" :key="id" class="flex justify-between items-center w-72">
                {{ id.trim() }} (x{{ qty }})
                <button @click="removeReceiverCard(id)" class="text-red-600 text-xs ml-2">Remove</button>
              </li>
            </ul>
          </div>
  
          <!-- Submit -->
          <div class="mt-6 text-center">
            <button @click="submitTrade" data-testid="submit-trade" class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="(tradeMode === 'direct' && (!userExists || !username)) || getSelectedSenderCards().length === 0 || getSelectedReceiverCards().length === 0">
              {{ tradeMode === 'direct' ? 'Send Trade Offer' : 'Create Open Offer'.trim() }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Modal -->
      <OpenTradeModal
  :visible="showModal"
  :offers="openOffers"
  :loading="openLoading"
  :error="openError"
  :current-user-id="userId"
  :user-collection="userCollection"
  @close="showModal = false"
  @accept="acceptOpenOffer"
  @decline="declineTrade"
/>

    </div>
  </template>
 <script setup lang="ts">
 import { ref, computed, watch, onMounted } from 'vue';
 import type { TradeCard, TradeOffer, CreateTradeOfferPayload } from '../interfaces/trade';
 import type { PokemonCard } from '../interfaces/card';
 import CardSelector from '../components/CardSelector.vue';
 import OpenTradeModal from '../components/OpenTradeModal.vue';
 import { useUsers, getAuthToken } from '../modules/auth/userModels';
 import { createTradeOffer, fetchTradesForUser, acceptTradeOffer,declineTradeOffer } from '../modules/tradeApi';
 import { useCollection } from '../modules/useCollection';
  import ToastView from '../components/shared/ToastView.vue'


  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004';

const toastRef = ref()

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  toastRef.value?.showToast(msg, type)
}


 const tabs = ['incoming', 'outgoing', 'completed'] as const;
 type TabType = (typeof tabs)[number];
 const activeTab = ref<TabType>('incoming');
 
 const { user } = useUsers();
 const userId = computed(() => user?.value?._id ?? localStorage.getItem("userIDToken") ?? '');
 
 const allTrades = ref<TradeOffer[]>([]);
  const incoming = computed(() =>
  allTrades.value.filter(t => {
    const receiver = typeof t.receiverId === 'string' ? t.receiverId : t.receiverId?._id;
    return receiver === userId.value;
  })
);

const outgoing = computed(() =>
  allTrades.value.filter(t => {
    const sender = typeof t.senderId === 'string' ? t.senderId : t.senderId?._id;
    return sender === userId.value;
  })
);
 const cardList = (cards: TradeCard[]) => cards.map(c => `${c.cardId} (x${c.quantity})`).join(', ');
 
 
 const username = ref('');
 const userExists = ref<null | boolean>(null);
  const { collection: userCollection, fetchCollection } = useCollection();
  const selectedSender = ref<Record<string, number>>({});
 const selectedCardId = ref('');
 const selectedQuantity = ref(1);
 const selectedReceiverCards = ref<Record<string, number>>({});
 const tradeMode = ref<'direct' | 'open'>('direct');
 const showModal = ref(false);
 const openOffers = ref<TradeOffer[]>([]);
 const openLoading = ref(false);
 const openError = ref<string | null>(null);
 
 const getCardMax = (cardId: string): number => userCollection.value.find(c => c.cardId === cardId)?.quantity ?? 1;
 const addCardToSelection = () => {
   if (!selectedCardId.value) return;
   const max = getCardMax(selectedCardId.value);
   const qty = Math.min(selectedQuantity.value, max);
   if (qty > 0) selectedSender.value[selectedCardId.value] = qty;
   selectedCardId.value = '';
   selectedQuantity.value = 1;
 };
 const removeCard = (cardId: string) => delete selectedSender.value[cardId];
 const addReceiverCard = (card: PokemonCard) => selectedReceiverCards.value[card.id] = (selectedReceiverCards.value[card.id] || 0) + 1;
 const removeReceiverCard = (cardId: string) => delete selectedReceiverCards.value[cardId];
 const getSelectedSenderCards = (): TradeCard[] =>
 Object.entries(selectedSender.value).map(([cardId, quantity]) => ({
    cardId,
    quantity
  }));

  const getSelectedReceiverCards = (): TradeCard[] =>
  Object.entries(selectedReceiverCards.value).map(([cardId, quantity]) => ({
    cardId,
    quantity
  }));
 
 const submitTrade = async () => {
  try {
    const payload: CreateTradeOfferPayload = {
  senderId: userId.value,
  senderCards: getSelectedSenderCards(),
  receiverCards: getSelectedReceiverCards(),
  ...(tradeMode.value === 'direct' ? { receiverUsername: username.value } : {}),
  ...(tradeMode.value === 'open' ? { isOpenOffer: true } : {})
};


    console.log("📦 Frontend payload (JSON):", JSON.stringify(payload, null, 2));

    await createTradeOffer(payload);
    showToast('Trade offer sent!', 'success');

    // Reset state
    selectedSender.value = {};
    selectedReceiverCards.value = {};
    username.value = '';
    userExists.value = null;

    await loadTrades();
  } catch (err: unknown) {
    if (err instanceof Error) {
      showToast(err.message, 'error');
    } else {
      showToast('Failed to send trade offer.', 'error');
    }
  }
};
 
 const loadTrades = async () => {
   if (!userId.value) return;
   allTrades.value = await fetchTradesForUser(userId.value);
 };

 const authHeaders = () => ({
  'Content-Type': 'application/json',
  'auth-token': getAuthToken() || '',
});
 
const fetchOpenOffers = async () => {
  openLoading.value = true;
  openError.value = null;

  try {
    const res = await fetch(`${BASE_URL}/trades/open`, {
      headers: authHeaders(),
    });

    if (!res.ok) {
      // parse error body, but don’t overwrite offers with it
      const err = await res.json();
      openError.value = err.message || err.error || 'Failed to fetch open offers';
      openOffers.value = []; 
      return;
    }

    // success: parse and assign the array
    const offersArray = await res.json();
    openOffers.value = Array.isArray(offersArray) ? offersArray : [];
  } catch {
  openError.value = 'Failed to fetch open offers';
  openOffers.value = [];
  } finally {
    openLoading.value = false;
  }
};
 watch(showModal, async (isVisible) => {
  if (isVisible) {
    await fetchOpenOffers();
  }
});

const openMarketplace = async () => {
  showModal.value = true;
  await fetchOpenOffers();
};


 const acceptTrade = async (id: string) => {
  try {
    await acceptTradeOffer(id, userId.value);
    showToast('Trade accepted', 'success');
    await loadTrades();
  } catch (err: unknown) {
    if (err instanceof Error) {
      showToast(err.message, 'error');
    } else {
      showToast('Failed to accept trade', 'error');
    }
  }
};


 
const declineTrade = async (tradeId: string, actingUserId?: string) => {
  await declineTradeOffer(tradeId, actingUserId || userId.value);
  showToast('Trade declined', 'success');
  await loadTrades();
  await fetchOpenOffers();
};


 
const acceptOpenOffer = async (tradeId: string) => {
  await acceptTradeOffer(tradeId, userId.value); // ✅ send userId
  showToast('Trade accepted from marketplace', 'success');
  showModal.value = false;
  await fetchOpenOffers();
  await loadTrades();
};
 
 function debounce<T extends (...args: string[]) => void>(fn: T, delay: number): (...args: Parameters<T>) => void {
   let timer: ReturnType<typeof setTimeout>;
   return (...args: Parameters<T>) => {
     clearTimeout(timer);
     timer = setTimeout(() => fn(...args), delay);
   };
 }
 
 watch(username, debounce(async (val: string) => {
   if (val.trim()) {
     const res = await fetch(`/api/users/check?username=${val}`);
     const data = await res.json();
     userExists.value = data.exists;
   } else {
     userExists.value = null;
   }
 }, 500));
 
 onMounted(async () => {
  console.log("🔎 userId:", userId.value);
  try {
    await fetchCollection(userId.value);
    console.log("✅ Collection loaded:", userCollection.value);

    await loadTrades();
  } catch (err) {
    console.error("❌ Failed to fetch collection in TradeView:", err);
  }
});


 </script>
 
 <style scoped>
 h1 {
   font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
 }
 </style>