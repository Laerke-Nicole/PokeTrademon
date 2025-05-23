import { ref, computed } from 'vue'
import type { TradeOffer, TradeCard } from '../interfaces/trade'
import { fetchTradesForUser, acceptTradeOffer, declineTradeOffer } from '../modules/api/tradeApi'
import { getAuthToken } from '../modules/auth/userModels'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004'

export const useTrades = (
  userId: string,
  showToast: (msg: string, type?: 'success' | 'error') => void,
) => {
  const allTrades = ref<TradeOffer[]>([])
  const loadingTrades = ref(true)
  const openOffers = ref<TradeOffer[]>([])
  const openLoading = ref(false)
  const openError = ref<string | null>(null)

  const incoming = computed(() =>
    allTrades.value.filter((t) => {
      const receiver = typeof t.receiverId === 'string' ? t.receiverId : t.receiverId?._id
      return receiver === userId && t.status === 'pending'
    }),
  )

  const outgoing = computed(() =>
    allTrades.value.filter((t) => {
      const sender = typeof t.senderId === 'string' ? t.senderId : t.senderId?._id
      return sender === userId && t.status === 'pending'
    }),
  )

  const completed = computed(() => {
    return allTrades.value
      .filter((t) => {
        const sender = typeof t.senderId === 'string' ? t.senderId : t.senderId?._id
        const receiver = typeof t.receiverId === 'string' ? t.receiverId : t.receiverId?._id
        return (
          (sender === userId || receiver === userId) &&
          (t.status === 'accepted' || t.status === 'declined')
        )
      })
      .sort((a, b) => new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime())
  })

  const completedFilter = ref<'all' | 'accepted' | 'declined'>('all')

  const filteredCompleted = computed(() => {
    return completed.value.filter((t) => {
      if (completedFilter.value === 'all') return true
      return t.status === completedFilter.value
    })
  })

  const isSender = (t: TradeOffer): boolean => {
    const sid = typeof t.senderId === 'string' ? t.senderId : t.senderId?._id
    return sid === userId
  }

  const getUsername = (u: string | { username?: string } | null | undefined): string => {
    if (!u) return ''
    if (typeof u === 'string') return u
    return u.username || ''
  }

  const cardList = (cards: TradeCard[]) =>
    cards.map((c) => `${c.cardId} (x${c.quantity})`).join(', ')

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    'auth-token': getAuthToken() || '',
  })

  const loadTrades = async () => {
    loadingTrades.value = true
    allTrades.value = await fetchTradesForUser(userId)
    loadingTrades.value = false
  }

  const fetchOpenOffers = async () => {
    openLoading.value = true
    openError.value = null

    try {
      const res = await fetch(`${BASE_URL}/trades/open`, {
        headers: authHeaders(),
      })

      if (!res.ok) {
        const err = await res.json()
        openError.value = err.message || 'Failed to fetch open offers'
        openOffers.value = []
        return
      }

      const offersArray = await res.json()
      openOffers.value = Array.isArray(offersArray) ? offersArray : []
    } catch {
      openError.value = 'Failed to fetch open offers'
      openOffers.value = []
    } finally {
      openLoading.value = false
    }
  }

  const acceptTrade = async (id: string) => {
    try {
      await acceptTradeOffer(id, userId)
      showToast('Trade accepted', 'success')
      await loadTrades()
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Failed to accept trade', 'error')
    }
  }

  const declineTrade = async (id: string) => {
    try {
      await declineTradeOffer(id, userId)
      showToast('Trade declined', 'success')
      await loadTrades()
      await fetchOpenOffers()
    } catch {
      showToast('Failed to decline trade', 'error')
    }
  }

  const acceptOpenOffer = async (id: string) => {
    try {
      await acceptTradeOffer(id, userId)
      showToast('Trade accepted from marketplace', 'success')
      await fetchOpenOffers()
      await loadTrades()
    } catch (err: any) {
      const message =
        err instanceof Error
          ? err.message
          : err?.response?.data?.message || 'Trade acceptance failed.'
      showToast(`Failed to accept open trade: ${message}`, 'error')
    }
  }

  return {
    allTrades,
    incoming,
    outgoing,
    completed,
    openOffers,
    openLoading,
    openError,
    loadingTrades,
    isSender,
    getUsername,
    cardList,
    loadTrades,
    fetchOpenOffers,
    acceptTrade,
    declineTrade,
    acceptOpenOffer,
    completedFilter,
    filteredCompleted,
  }
}
