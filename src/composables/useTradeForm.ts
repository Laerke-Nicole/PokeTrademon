import { ref, watch } from 'vue'
import type { TradeCard, CreateTradeOfferPayload } from '../interfaces/trade'
import type { PokemonCard } from '../interfaces/card'
import { createTradeOffer } from '../modules/api/tradeApi'
import { debounce } from '../modules/helpers/debounce'


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004'

export const useTradeForm = (
  userId: string,
  showToast: (msg: string, type?: 'success' | 'error') => void,
  reloadTrades: () => Promise<void>,
  userCollection: { cardId: string; quantity: number }[]
) => {
  const username = ref('')
  const userExists = ref<null | boolean>(null)
  const tradeMode = ref<'direct' | 'open'>('direct')

  const selectedSender = ref<Record<string, number>>({})
  const selectedReceiverCards = ref<Record<string, number>>({})
  const selectedCardId = ref('')
  const selectedQuantity = ref(1)

  const getCardMax = (cardId: string): number =>
    userCollection.find((c) => c.cardId === cardId)?.quantity ?? 1

  const addCardToSelection = () => {
    if (!selectedCardId.value) return
    const max = getCardMax(selectedCardId.value)
    const qty = Math.min(selectedQuantity.value, max)
    if (qty > 0) selectedSender.value[selectedCardId.value] = qty
    selectedCardId.value = ''
    selectedQuantity.value = 1
  }

  const removeCard = (cardId: string) => {
    delete selectedSender.value[cardId]
  }

  const addReceiverCard = (card: PokemonCard) => {
    selectedReceiverCards.value[card.id] = (selectedReceiverCards.value[card.id] || 0) + 1
  }

  const removeReceiverCard = (cardId: string) => {
    delete selectedReceiverCards.value[cardId]
  }

  const getSelectedSenderCards = (): TradeCard[] =>
    Object.entries(selectedSender.value).map(([cardId, quantity]) => ({ cardId, quantity }))

  const getSelectedReceiverCards = (): TradeCard[] =>
    Object.entries(selectedReceiverCards.value).map(([cardId, quantity]) => ({ cardId, quantity }))

  const submitTrade = async () => {
    try {
      const payload: CreateTradeOfferPayload = {
        senderId: userId,
        senderCards: getSelectedSenderCards(),
        receiverCards: getSelectedReceiverCards(),
        ...(tradeMode.value === 'direct' ? { receiverUsername: username.value } : {}),
        ...(tradeMode.value === 'open' ? { isOpenOffer: true } : {}),
      }

      await createTradeOffer(payload)
      showToast('Trade offer sent!', 'success')

      // Reset form
      selectedSender.value = {}
      selectedReceiverCards.value = {}
      username.value = ''
      userExists.value = null

      await reloadTrades()
    } catch (err: unknown) {
      if (err instanceof Error) {
        showToast(err.message, 'error')
      } else {
        showToast('Failed to send trade offer.', 'error')
      }
    }
  }

  // Debounced username check
  function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout>
    return (...args: Parameters<T>) => {
      clearTimeout(timer)
      timer = setTimeout(() => fn(...args), delay)
    }
  }

  watch(
    username,
    debounce(async (val: string) => {
      if (val.trim()) {
        const res = await fetch(`${BASE_URL}/users/check?username=${val}`)
        const data = await res.json()
        userExists.value = data.exists
      } else {
        userExists.value = null
      }
    }, 500)
  )
  

  return {
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
  }
}
