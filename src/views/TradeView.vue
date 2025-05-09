<template>
    <div class="min-h-screen bg-gradient-to-b from-slate-100 to-blue-100 pt-32 pb-10">
    <!-- Toast -->
    <div v-if="toast.visible" :class="['fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white z-50', toast.type === 'success' ? 'bg-green-600' : 'bg-red-600']">
      {{ toast.message }}
    </div>

    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-10">My Trade Offers</h1>

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
          {{ tab.charAt(0).toUpperCase() + tab.slice(1) }} Offers
        </button>
        <button class="text-blue-600 underline text-sm" @click="showModal = true">Browse Open Offers</button>
      </div>
  
        <!-- Offer Lists -->
        <div v-if="activeTab === 'incoming'">
          <div v-if="incoming.length === 0" class="text-center text-gray-600">No incoming offers yet.</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="trade in incoming" :key="trade._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between mb-2">
                <div class="font-semibold text-gray-800">From: {{ trade.senderId.username }}</div>
                <span :class="['text-xs px-2 py-1 rounded-full font-semibold', trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">
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
            <div v-for="trade in outgoing" :key="trade._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between mb-2">
                <div class="font-semibold text-gray-800">To: {{ trade.receiverId?.username || 'Anyone (Open)' }}</div>
                <span :class="['text-xs px-2 py-1 rounded-full font-semibold', trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">
                  {{ trade.status }}
                </span>
              </div>
              <p class="text-sm text-gray-700"><strong>You offer:</strong> {{ cardList(trade.senderCards) }}</p>
              <p class="text-sm text-gray-700"><strong>You want:</strong> {{ cardList(trade.receiverCards) }}</p>
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
              <input type="radio" value="direct" v-model="tradeMode" /> Direct
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="open" v-model="tradeMode" /> Open
            </label>
          </div>
  
          <!-- Username -->
          <div v-if="tradeMode === 'direct'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Receiver Username:</label>
            <input v-model="username" placeholder="Receiver Username" class="rounded p-2 border w-full" />
            <p v-if="userExists === true" class="text-green-600 text-sm mt-1">✅ User exists</p>
            <p v-else-if="userExists === false" class="text-red-600 text-sm mt-1">❌ User not found</p>
          </div>
  
          <!-- Sender Cards -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Select Your Cards:</label>
            <div class="flex items-center gap-3 mb-2">
              <select v-model="selectedCardId" class="border rounded p-1">
                <option disabled value="">-- Choose a card --</option>
                <option v-for="card in userCollection" :key="card.cardId" :value="card.cardId" :disabled="card.quantity === 0">
                  {{ card.cardId }} (You have: {{ card.quantity }})
                </option>
              </select>
              <input type="number" v-model.number="selectedQuantity" :min="1" :max="getCardMax(selectedCardId)" class="w-20 p-1 border rounded" :disabled="!selectedCardId" />
              <button @click="addCardToSelection" class="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50" :disabled="!selectedCardId || selectedQuantity < 1">Add</button>
            </div>
            <ul class="text-sm text-gray-800 ml-1">
              <li v-for="(qty, id) in selectedSender" :key="id" class="flex justify-between items-center w-60">
                {{ id }} (x{{ qty }})
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
                {{ id }} (x{{ qty }})
                <button @click="removeReceiverCard(id)" class="text-red-600 text-xs ml-2">Remove</button>
              </li>
            </ul>
          </div>
  
          <!-- Submit -->
          <div class="mt-6 text-center">
            <button @click="submitTrade" class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="(tradeMode === 'direct' && (!userExists || !username)) || getSelectedSenderCards().length === 0 || getSelectedReceiverCards().length === 0">
              {{ tradeMode === 'direct' ? 'Send Trade Offer' : 'Create Open Offer' }}
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
        @close="showModal = false"
        @accept="acceptOpenOffer"
        @decline="declineTrade"
      />
    </div>
  </template>
 <script setup lang="ts">
 import { ref, computed, watch, onMounted } from 'vue';
 import type { TradeCard, TradeOffer } from '../interfaces/trade';
 import type { PokemonCard } from '../interfaces/card';
 import CardSelector from '../components/CardSelector.vue';
 import OpenTradeModal from '../components/OpenTradeModal.vue';
 import { useUsers } from '../modules/auth/userModels';
 import { createTradeOffer, fetchTradesForUser, acceptTradeOffer, declineTradeOffer } from '../modules/tradeApi';
 import { getUserCollection } from '../modules/collectionApi';
 
 const tabs = ['incoming', 'outgoing', 'completed'] as const;
 type TabType = (typeof tabs)[number];
 const activeTab = ref<TabType>('incoming');
 
 const { user } = useUsers();
 const userId = computed(() => user?.value?._id ?? localStorage.getItem("userIDToken") ?? '');
 
 const allTrades = ref<TradeOffer[]>([]);
 const incoming = computed(() => allTrades.value.filter(t => t.receiverId?._id === userId.value));
 const outgoing = computed(() => allTrades.value.filter(t => t.senderId._id === userId.value));
 const cardList = (cards: TradeCard[]) => cards.map(c => `${c.cardId} (x${c.quantity})`).join(', ');
 
 const toast = ref({ message: '', type: 'success' as 'success' | 'error', visible: false });
 const showToast = (message: string, type: 'success' | 'error' = 'success') => {
   toast.value = { message, type, visible: true };
   setTimeout(() => (toast.value.visible = false), 3000);
 };
 
 const username = ref('');
 const userExists = ref<null | boolean>(null);
 const userCollection = ref<TradeCard[]>([]);
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
 const getSelectedSenderCards = (): TradeCard[] => Object.entries(selectedSender.value).map(([cardId, quantity]) => ({ cardId, quantity, name: '', image: '' }));
 const getSelectedReceiverCards = (): TradeCard[] => Object.entries(selectedReceiverCards.value).map(([cardId, quantity]) => ({ cardId, quantity, name: '', image: '' }));
 
 const submitTrade = async () => {
   try {
     const payload = {
       senderId: userId.value,
       receiverUsername: tradeMode.value === 'direct' ? username.value : '',
       senderCards: getSelectedSenderCards(),
       receiverCards: getSelectedReceiverCards(),
       ...(tradeMode.value === 'open' ? { isOpenOffer: true } : {})
     };
     await createTradeOffer(payload);
     showToast('Trade offer sent!', 'success');
     selectedSender.value = {};
     selectedReceiverCards.value = {};
     username.value = '';
     userExists.value = null;
     await loadTrades();
   } catch {
     showToast('Failed to send trade offer.', 'error');
   }
 };
 
 const loadTrades = async () => {
   if (!userId.value) return;
   allTrades.value = await fetchTradesForUser(userId.value);
 };
 
 const fetchOpenOffers = async () => {
   openLoading.value = true;
   try {
     const res = await fetch('/api/trades/open');
     openOffers.value = await res.json();
   } catch {
     openError.value = 'Failed to fetch open offers';
   } finally {
     openLoading.value = false;
   }
 };
 
 const acceptTrade = async (id: string) => {
   await acceptTradeOffer(id);
   showToast('Trade accepted', 'success');
   await loadTrades();
 };
 
 const declineTrade = async (id: string) => {
   await declineTradeOffer(id);
   showToast('Trade declined', 'success');
   await loadTrades();
 };
 
 const acceptOpenOffer = async (tradeId: string) => {
   await acceptTradeOffer(tradeId);
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
   const res = await getUserCollection(userId.value);
   userCollection.value = res.collection;
   await loadTrades();
   await fetchOpenOffers();
 });
 </script>
 
 <style scoped>
 h1 {
   font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
 }
 </style>