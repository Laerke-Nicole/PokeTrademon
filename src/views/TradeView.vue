<template>
    <div class="pt-30 five-percent dark-bg min-h-screen ">
     
      
      <ToastView ref="toastRef" />


    <div class="max-w-screen-xl mx-auto px-4">
      <h1 class="text-3xl text-center dark-headline pb-10 text-center w-full" data-testid="my-trade-offers" v-motion-fade-slide>My Trade Offers</h1>

      <!-- 2️⃣ Show loading message while trades load -->
    <div v-if="loadingTrades" class="text-center dark-text py-20">
      Loading Offers...
   </div>
   <div v-else>

      <!-- Tabs -->
      <div class="flex justify-center pb-6 space-x-4 items-center" v-motion-fade-slide>
  <button
    type="button"
    v-for="tab in tabs"
    :key="tab"
    @click="activeTab = tab"
    :class="[
      'px-4 py-2 rounded-full text-sm font-medium cursor-pointer offer-btn',
      activeTab === tab ? 'yellow-bg' : 'bg-white dark-headline hover:bg-gray-100'
    ]"
  >
    {{ tab === 'marketplace' ? 'Open Offers' : tab.charAt(0).toUpperCase() + tab.slice(1) + ' Offers' }}
  </button>
</div>
  
        <!-- Marketplace Modal -->
        
        <div v-if="activeTab === 'marketplace'">
  <div v-if="openLoading" class="text-center py-10 dark-text">Loading open offers...</div>
  <div v-else-if="openError" class="text-center text-red-600 py-10">{{ openError }}</div>
  <div v-else-if="openOffers.length === 0" class="text-center dark-text">No open offers available.</div>

  <div class="grid md:grid-cols-2 gap-6 mt-6">
    <div
      v-for="offer in openOffers"
      :key="offer._id"
      class="bg-white p-4 rounded-xl shadow-md border"
    >
      <div class="flex justify-between pb-2">
        <div class="font-semibold dark-text">From: {{ getUsername(offer.senderId) }}</div>
        <span class="text-xs px-2 py-1 rounded-full font-semibold bg-yellow-100 text-yellow-800">
          Open Offer
        </span>
      </div>

      <p class="text-sm dark-text"><strong>They offer:</strong> {{ cardList(offer.senderCards) }}</p>
      <p class="text-sm dark-text"><strong>They want:</strong> {{ cardList(offer.receiverCards) }}</p>

      <div class="pt-4 flex space-x-2">
        <button
          class="bg-green-500 hover:bg-green-600 light-headline px-4 py-1 rounded-corner text-sm"
          @click="acceptOpenOffer(offer._id)"
        >
          Accept
        </button>
        <button
          class="bg-red-500 hover:bg-red-600 light-headline px-4 py-1 rounded-corner text-sm"
          @click="declineTrade(offer._id)"
        >
          Decline
        </button>
      </div>
    </div>
  </div>
</div>

        
        <!-- Offer Lists -->
        <div v-if="activeTab === 'incoming'">
          <div v-if="incoming.length === 0" class="text-center dark-text">No incoming offers yet.</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="trade in incoming" :key="trade._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between pb-2">
                <div class="font-semibold dark-text">From: {{ trade.senderId.username.trim() }}</div>
                <span :class="['text-xs px-2 py-1 rounded-full font-semibold', trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">
                  {{ trade.status.trim() }}
                </span>
              </div>
              <p class="text-sm dark-text"><strong>They offer:</strong> {{ cardList(trade.senderCards).trim() }}</p>
              <p class="text-sm dark-text"><strong>They want:</strong> {{ cardList(trade.receiverCards).trim() }}</p>
              <div v-if="trade.status === 'pending'" class="pt-4 flex space-x-2">
                <button class="bg-green-500 hover:bg-green-600 light-headline px-4 py-1 rounded-corner text-sm" @click="acceptTrade(trade._id)">Accept</button>
                <button class="bg-red-500 hover:bg-red-600 light-headline px-4 py-1 rounded-corner text-sm" @click="declineTrade(trade._id)">Decline</button>
              </div>
            </div>
          </div>
        </div>
  
        <div v-else-if="activeTab === 'outgoing'">
          <div v-if="outgoing.length === 0" class="text-center dark-text">No outgoing offers yet.</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="trade in outgoing" :key="trade._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between pb-2">
                <div class="font-semibold dark-text">To: {{ trade.receiverId?.username || 'Anyone (Open)'.trim() }}</div>
                <span :class="['text-xs px-2 py-1 rounded-full font-semibold', trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">
                  {{ trade.status.trim() }}
                </span>
              </div>
              <p class="text-sm dark-text"><strong>You offer:</strong> {{ cardList(trade.senderCards).trim() }}</p>
              <p class="text-sm dark-text"><strong>You want:</strong> {{ cardList(trade.receiverCards).trim() }}</p>
            </div>
          </div>
        </div>
  
<!-- Completed Offers -->
<div v-else-if="activeTab === 'completed'">
  <div v-if="completed.length === 0" class="text-center dark-text">
    No completed offers yet.
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    <div
      v-for="trade in completed"
      :key="trade._id"
      class="bg-white p-4 rounded-xl shadow-md border"
    >
      <div class="flex justify-between pb-2">
        <div class="font-semibold dark-text">
          <span v-if="isSender(trade)">
            To: {{ getUsername(trade.receiverId) }}
          </span>
          <span v-else>
            From: {{ getUsername(trade.senderId) }}
          </span>
        </div>
        <span
          :class="[
            'text-xs px-2 py-1 rounded-full font-semibold',
            trade.status === 'accepted'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          ]"
        >
          {{ trade.status }}
        </span>
      </div>

      <p class="text-sm dark-text">
        <strong>You offered:</strong> {{ cardList(trade.senderCards) }}
      </p>
      <p class="text-sm dark-text">
        <strong>You wanted:</strong> {{ cardList(trade.receiverCards) }}
      </p>
    </div>
  </div>
</div>


  
        <!-- Trade Form -->
        <div v-if="userId" class="pt-10 flex justify-center" v-motion-fade-slide>
  <div class="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 space-y-6">
    <h2 class="text-2xl font-bold text-center text-gray-800">Create a Trade Offer</h2>

    <!-- Mode Toggle -->
    <div class="flex justify-center gap-6">
      <label class="flex items-center gap-2 text-gray-700 font-medium">
        <input type="radio" value="direct" v-model="tradeMode" data-testid="direct-toggle" />
        Direct
      </label>
      <label class="flex items-center gap-2 text-gray-700 font-medium">
        <input type="radio" value="open" v-model="tradeMode" />
        Open
      </label>
    </div>

    <!-- Username -->
    <div v-if="tradeMode === 'direct'">
      <label class="block text-sm font-semibold text-gray-700 pb-1">Receiver Username:</label>
      <input
        v-model="username"
        placeholder="Receiver Username"
        class="w-full border p-2 rounded-md shadow-sm"
        data-testid="receiver-username"
      />
      <p v-if="userExists === true" class="text-green-600 text-sm pt-1">User exists</p>
      <p v-else-if="userExists === false" class="text-red-600 text-sm pt-1">User not found</p>
    </div>

    <!-- Sender Cards -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 pb-2">Select Your Cards:</label>
      <div class="flex flex-wrap gap-3 items-center">
        <select v-model="selectedCardId" class="border p-2 rounded-md" data-testid="user-card-dropdown">
          <option disabled value="">-- Choose a card --</option>
          <option
            v-for="card in userCollection"
            :key="card.cardId"
            :value="card.cardId"
            :disabled="card.quantity === 0"
          >
            {{ card.cardId.trim() }} (You have: {{ card.quantity }})
          </option>
        </select>
        <input
          type="number"
          v-model.number="selectedQuantity"
          :min="1"
          :max="getCardMax(selectedCardId)"
          class="w-20 border p-2 rounded-md"
          :disabled="!selectedCardId"
        />
        <button
          @click="addCardToSelection"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!selectedCardId || selectedQuantity < 1"
          data-testid="user-card-add"
        >
          Add
        </button>
      </div>
      <ul class="mt-4 text-sm text-gray-800">
        <li
          v-for="(qty, id) in selectedSender"
          :key="id"
          class="flex justify-between items-center py-1"
        >
          {{ id.trim() }} (x{{ qty }})
          <button @click="removeCard(id)" class="text-red-500 text-xs hover:underline">Remove</button>
        </li>
      </ul>
    </div>

    <!-- Requested Cards -->
    <div>
      <h3 class="text-lg font-semibold text-gray-700 mb-2">Select Requested Cards:</h3>
      <CardSelector
        mode="select"
        :selected-cards="selectedReceiverCards"
        @card-selected="addReceiverCard"
        @card-removed="removeReceiverCard"
      />
    </div>

    <!-- Submit Button -->
    <div class="text-center pt-4">
      <button
        @click="submitTrade"
        data-testid="submit-trade"
        class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="(tradeMode === 'direct' && (!userExists || !username)) || getSelectedSenderCards().length === 0 || getSelectedReceiverCards().length === 0"
      >
        {{ tradeMode === 'direct' ? 'Send Trade Offer' : 'Create Open Offer'.trim() }}
      </button>
    </div>
  </div>
</div>

        </div>
  


    </div>
    </div>
  </template>
 <script setup lang="ts">
 import { ref, computed, watch, onMounted } from 'vue';
 import { scrollToTop } from '../modules/scrollToTop/TopRouterView';
 import type { TradeCard, TradeOffer, CreateTradeOfferPayload } from '../interfaces/trade';
 import type { PokemonCard } from '../interfaces/card';
 import CardSelector from '../components/CardSelector.vue';
 import { useUsers, getAuthToken } from '../modules/auth/userModels';
 import { createTradeOffer, fetchTradesForUser, acceptTradeOffer,declineTradeOffer } from '../modules/tradeApi';
 import { useCollection } from '../modules/useCollection';
 import ToastView from '../components/shared/ToastView.vue';


  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004';

const toastRef = ref()

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  toastRef.value?.showToast(msg, type)
}

const loadingTrades = ref(true);

 const tabs = ['incoming', 'outgoing', 'completed', 'marketplace'] as const;
 type TabType = (typeof tabs)[number];
 const activeTab = ref<TabType>('incoming');
 
 const { user } = useUsers();
 const userId = computed(() => user?.value?._id ?? localStorage.getItem("userIDToken") ?? '');
 
 const allTrades = ref<TradeOffer[]>([]);
  
 const incoming = computed(() =>
  allTrades.value.filter(t => {
    const receiver = typeof t.receiverId === 'string'
      ? t.receiverId
      : t.receiverId?._id;
    return receiver === userId.value
      && t.status === 'pending';
  })
);


const outgoing = computed(() =>
  allTrades.value.filter(t => {
    const sender = typeof t.senderId === 'string'
      ? t.senderId
      : t.senderId?._id;
    return sender === userId.value
      && t.status === 'pending';
  })
);

const completed = computed(() =>
  allTrades.value.filter(t => {
    const iAmSender = (typeof t.senderId === 'string'
      ? t.senderId
      : t.senderId?._id) === userId.value;
    const iAmReceiver = (typeof t.receiverId === 'string'
      ? t.receiverId
      : t.receiverId?._id) === userId.value;
    return (iAmSender || iAmReceiver)
      && (t.status === 'accepted' || t.status === 'declined');
  })
);

/**
 * Whether the current user is the sender of this trade.
 */
 const isSender = (t: TradeOffer): boolean => {
  // Normalize senderId into a string
  const sid =
    typeof t.senderId === 'string' ? t.senderId : t.senderId?._id;
  return sid === userId.value;
};

/**
 * Safely grab a username. 
 * If `u` is:
 *  • an object with `.username`, return that
 *  • a string, return it
 *  • falsy, return empty string
 */
const getUsername = (
  u: string | { username?: string } | null | undefined
): string => {
  if (!u) return '';
  if (typeof u === 'string') return u;
  return u.username || '';
};


 const cardList = (cards: TradeCard[]) => cards.map(c => `${c.cardId} (x${c.quantity})`).join(', ');
 
 
 const username = ref('');
 const userExists = ref<null | boolean>(null);
  const { collection: userCollection, fetchCollection } = useCollection();
  const selectedSender = ref<Record<string, number>>({});
 const selectedCardId = ref('');
 const selectedQuantity = ref(1);
 const selectedReceiverCards = ref<Record<string, number>>({});
 const tradeMode = ref<'direct' | 'open'>('direct');
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
   loadingTrades.value = true;
   allTrades.value = await fetchTradesForUser(userId.value);
   loadingTrades.value = false;
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


watch(activeTab, async (tab) => {
  if (tab === 'marketplace') {
    await fetchOpenOffers();
  }
});



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
  await acceptTradeOffer(tradeId, userId.value); // send userId
  showToast('Trade accepted from marketplace', 'success');
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
  try {
    await fetchCollection(userId.value);

    await loadTrades();
  } catch (err) {
    console.error("Failed to fetch collection in TradeView:", err);
  }
});


// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});

</script>
 
<style scoped>
.offer-btn {
  margin-right: 10px;
}
</style>