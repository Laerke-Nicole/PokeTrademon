<template>
   <div class="pt-30 five-percent dark-bg min-h-screen">
    <ToastView ref="toastRef" />

    <div class="max-w-screen-xl mx-auto px-4">
      <h1 class="text-3xl text-center dark-headline pb-10 w-full" data-testid="my-trade-offers" v-motion-fade-slide>
        My Trade Offers
      </h1>

      <div v-if="loadingTrades" class="text-center dark-text py-20">Loading Offers...</div>
      <div v-else>
        <!-- Tabs -->
        <div class="flex justify-center pb-6 space-x-4 items-center" v-motion-fade-slide>
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium cursor-pointer offer-btn',
              activeTab === tab ? 'yellow-bg' : 'bg-white dark-headline hover:bg-gray-100',
            ]"
          >
            {{ tab === 'marketplace' ? 'Open Offers' : tab.charAt(0).toUpperCase() + tab.slice(1) + ' Offers' }}
          </button>
        </div>

        <!-- Marketplace -->
        <div v-if="activeTab === 'marketplace'">
          <div v-if="openLoading" class="text-center py-10 dark-text">Loading open offers...</div>
          <div v-else-if="openError" class="text-center text-red-600 py-10">{{ openError }}</div>
          <div v-else-if="openOffers.length === 0" class="text-center dark-text">No open offers available.</div>

          <div class="grid md:grid-cols-2 gap-6 mt-6">
            <div v-for="offer in openOffers" :key="offer._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between pb-2">
                <div class="font-semibold dark-text">From: {{ extractUsername(offer.senderId) }}</div>
                <span class="text-xs px-2 py-1 rounded-full font-semibold bg-yellow-100 text-yellow-800">Open Offer</span>
              </div>
              <p class="text-sm dark-text"><strong>They offer:</strong> {{ formatCardList(offer.senderCards) }}</p>
              <p class="text-sm dark-text"><strong>They want:</strong> {{ formatCardList(offer.receiverCards) }}</p>
              <div class="pt-4 flex flex-col space-y-2">
  <!-- Offer from current user: Cancel only -->
  <div v-if="isTradeSender(offer, userId)">
    <button
      @click="declineTrade(offer._id)"
      class="bg-red-500 hover:bg-red-600 light-headline px-4 py-1 rounded-corner text-sm"
    >
      Cancel
    </button>
  </div>

  <!-- Offer from another user -->
  <div v-else>
    <button
      @click="acceptOpenOffer(offer._id)"
      class="px-4 py-1 rounded-corner text-sm text-white"
      :class="[
        canFulfillTrade(offer.receiverCards)
          ? 'bg-green-500 hover:bg-green-600'
          : 'bg-gray-400 cursor-not-allowed'
      ]"
      :disabled="!canFulfillTrade(offer.receiverCards)"
    >
      Accept
    </button>

    <!-- Message if user can't fulfill trade -->
    <p
      v-if="!canFulfillTrade(offer.receiverCards)"
      class="text-xs text-red-500 pt-1"
    >
      You don’t have the required cards to accept this trade.
    </p>
  </div>
</div>

            </div>
          </div>
        </div>

        <!-- Incoming -->
        <div v-if="activeTab === 'incoming'">
          <div v-if="incoming.length === 0" class="text-center dark-text">No incoming offers yet.</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="trade in incoming" :key="trade._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between pb-2">
                <div class="font-semibold dark-text">From: {{ extractUsername(trade.senderId) }}</div>
                <span :class="['text-xs px-2 py-1 rounded-full font-semibold', trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">{{ trade.status }}</span>
              </div>
              <p class="text-sm dark-text"><strong>They offer:</strong> {{ formatCardList(trade.senderCards) }}</p>
              <p class="text-sm dark-text"><strong>They want:</strong> {{ formatCardList(trade.receiverCards) }}</p>
              <div v-if="trade.status === 'pending'" class="pt-4 flex space-x-2">
                <button @click="acceptTrade(trade._id)" class="bg-green-500 hover:bg-green-600 light-headline px-4 py-1 rounded-corner text-sm">Accept</button>
                <button @click="declineTrade(trade._id)" class="bg-red-500 hover:bg-red-600 light-headline px-4 py-1 rounded-corner text-sm">Decline</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Outgoing -->
        <div v-else-if="activeTab === 'outgoing'">
          <div v-if="outgoing.length === 0" class="text-center dark-text">No outgoing offers yet.</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="trade in outgoing" :key="trade._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between pb-2">
                <div class="font-semibold dark-text">To: {{ extractUsername(trade.receiverId) || 'Anyone (Open)' }}</div>
                <span :class="['text-xs px-2 py-1 rounded-full font-semibold', trade.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800']">{{ trade.status }}</span>
              </div>
              <p class="text-sm dark-text"><strong>You offer:</strong> {{ formatCardList(trade.senderCards) }}</p>
              <p class="text-sm dark-text"><strong>You want:</strong> {{ formatCardList(trade.receiverCards) }}</p>
            </div>
          </div>
        </div>

        <!-- Completed -->
        <div v-else-if="activeTab === 'completed'">
          <!-- Filter Dropdown (only visible in Completed tab) -->
<div class="flex justify-start items-center mb-4 pb-3">
  <label class="text-sm font-semibold text-white mr-2">Filter:</label>
  <select
    v-model="completedFilter"
    class="border p-2 rounded-md text-white text-sm mt-6"
  >
    <option value="all">All</option>
    <option value="accepted">Accepted</option>
    <option value="declined">Declined</option>
  </select>
</div>

          <div v-if="completed.length === 0" class="text-center dark-text">No completed offers yet.</div>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="trade in filteredCompleted" :key="trade._id" class="bg-white p-4 rounded-xl shadow-md border">
              <div class="flex justify-between pb-2">
                <div class="font-semibold dark-text">
                  <span v-if="isTradeSender(trade, userId)"> To: {{ extractUsername(trade.receiverId) }} </span>
                  <span v-else> From: {{ extractUsername(trade.senderId) }} </span>
                </div>
                <span :class="['text-xs px-2 py-1 rounded-full font-semibold', trade.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">{{ trade.status }}</span>
              </div>
              <p class="text-sm dark-text"><strong>You offered:</strong> {{ formatCardList(trade.senderCards) }}</p>
              <p class="text-sm dark-text"><strong>You wanted:</strong> {{ formatCardList(trade.receiverCards) }}</p>
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
                <input
                  type="radio"
                  value="direct"
                  v-model="tradeMode"
                  data-testid="direct-toggle"
                />
                Direct
              </label>
              <label class="flex items-center gap-2 text-gray-700 font-medium">
                <input type="radio" value="open" v-model="tradeMode" />
                Open
              </label>
            </div>

            <!-- Username -->
            <div v-if="tradeMode === 'direct'">
              <label class="block text-sm font-semibold text-gray-700 pb-1"
                >Receiver Username:</label
              >
              <input
                v-model="username"
                placeholder="Receiver Username"
                class="w-full border p-2 rounded-md shadow-sm"
                data-testid="receiver-username"
              />
              <p v-if="userExists === true" class="text-green-600 text-sm pt-1">User exists</p>
              <p v-else-if="userExists === false" class="text-red-600 text-sm pt-1">
                User not found
              </p>
            </div>

            <!-- Sender Cards -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 pb-2"
                >Select Your Cards:</label
              >
              <div class="flex flex-wrap gap-3 items-center">
                <select
                  v-model="selectedCardId"
                  class="border p-2 rounded-md"
                  data-testid="user-card-dropdown"
                >
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
                  <button @click="removeCard(id)" class="text-red-500 text-xs hover:underline">
                    Remove
                  </button>
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
                :disabled="
                  (tradeMode === 'direct' && (!userExists || !username)) ||
                  getSelectedSenderCards().length === 0 ||
                  getSelectedReceiverCards().length === 0
                "
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
import { ref, computed, watch, onMounted } from 'vue'
import { scrollToTop } from '../modules/scrollToTop/TopRouterView'
import type { PokemonCard } from '../interfaces/card'
import type { TradeCard } from '../interfaces/trade'
import CardSelector from '../components/cards/CardSelector.vue'
import ToastView from '../components/shared/ToastView.vue'
import { useUsers } from '../modules/auth/userModels'
import { useCollection } from '../modules/useCollection'
import { useTrades } from '../composables/useTrades'
import { useTradeForm } from '../composables/useTradeForm'

// ✅ NEW UTILS
import {
  isTradeSender,
  extractUsername,
  formatCardList,
} from '../modules/helpers/tradeUtils'

const toastRef = ref()
const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  toastRef.value?.showToast(msg, type)
}

const { user } = useUsers()
const userId = computed(() => user?.value?._id ?? localStorage.getItem('userIDToken') ?? '')

const { collection: userCollection, fetchCollection } = useCollection()

// 🟡 Trade logic
const {
  allTrades,
  incoming,
  outgoing,
  completed,
  filteredCompleted,
  completedFilter,
  openOffers,
  openLoading,
  openError,
  loadingTrades,
  loadTrades,
  fetchOpenOffers,
  acceptTrade,
  declineTrade,
  acceptOpenOffer,
} = useTrades(userId.value, showToast)

// 🟢 Trade form logic (refactored)
const {
  username,
  userExists,
  tradeMode,
  selectedSender,
  selectedReceiverCards,
  selectedCardId,
  selectedQuantity,
  addCardToSelection,
  removeCard,
  addReceiverCard,
  removeReceiverCard,
  getCardMax,
  getSelectedSenderCards,
  getSelectedReceiverCards,
  submitTrade,
} = useTradeForm(userId.value, showToast, loadTrades, userCollection.value)

// 🟣 Helper functions
const canFulfillTrade = (requiredCards: TradeCard[]) => {
  return requiredCards.every(req => {
    const card = userCollection.value.find(c => c.cardId === req.cardId)
    return card && card.quantity >= req.quantity
  })
}

// 🔵 Tabs
const tabs = ['incoming', 'outgoing', 'completed', 'marketplace'] as const
type TabType = (typeof tabs)[number]
const activeTab = ref<TabType>('incoming')

watch(activeTab, async (tab) => {
  if (tab === 'marketplace') await fetchOpenOffers()
})


// 🟢 Initial Load
onMounted(async () => {
  try {
    await fetchCollection(userId.value)
    await loadTrades()
  } catch (err) {
    console.error('Failed to fetch collection in TradeView:', err)
  }
  scrollToTop()
})
</script>



<style scoped>
.offer-btn {
  margin-right: 10px;
}
</style>
