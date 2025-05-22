/* eslint-disable @typescript-eslint/no-explicit-any */

import { test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import TradeView from '../../views/TradeView.vue'

// Mock scrollTo to avoid JSDOM errors
Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
})

// ✅ Mock useUsers and getAuthToken
vi.mock('../../modules/auth/userModels', () => ({
  useUsers: () => ({ user: { value: { _id: '1' } } }),
  getAuthToken: () => 'test-token',
}))

// ✅ Mock collection API
vi.mock('../../modules/collectionApi', () => ({
  getUserCollection: vi.fn().mockResolvedValue({
    collection: [
      { cardId: 'card001', quantity: 2 },
      { cardId: 'card002', quantity: 1 },
    ],
  }),
}))

// ✅ Mock trade API
vi.mock('../../modules/tradeApi', () => ({
  fetchTradesForUser: vi.fn().mockResolvedValue([]),
  createTradeOffer: vi.fn().mockResolvedValue({}),
  acceptTradeOffer: vi.fn(),
}))

// ✅ Mock useCards to show Pikachu
vi.mock('../../modules/useCards', () => ({
  useCards: () => ({
    cards: ref([
      {
        id: 'pikachu-001',
        name: 'Pikachu',
        images: { small: 'https://example.com/pikachu.jpg' },
        supertype: 'Pokémon',
        hp: '60',
        rarity: 'Common',
        set: { name: 'Base Set' },
      },
    ]),
    searchQuery: ref(''),
    fetchCards: vi.fn(),
  }),
}))

// Mock localStorage user ID
beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'userIDToken') return '"1"'
    if (key === 'isToken') return 'test-token'
    return null
  })
})

test('Tradeview renders the my trade offers headline', () => {
  const wrapper = mount(TradeView, {
    global: {
      directives: {
        'motion-fade-slide': {}, // prevent warning
      },
    },
  })

  expect(wrapper.find('[data-testid="my-trade-offers"]').exists()).toBe(true)
})

test('User picks the card they want to get and submits trade', async () => {
  const wrapper = mount(TradeView, {
    global: {
      stubs: {
        CardSelector: {
          template: '<div><slot></slot></div>',
          props: ['mode', 'selectedCards'],
        },
      },
      directives: {
        'motion-fade-slide': {},
      },
    },
  })
  

  const vm = wrapper.vm as any

  // Bypass default state
  vm.userId = '1'
  vm.tradeMode = 'open'
  vm.selectedSender = { 'pikachu-001': 1 }
  vm.selectedReceiverCards = { 'charizard-001': 1 }
  vm.loadingTrades = false // ✅ force form to render

  await wrapper.vm.$nextTick()

  const submitButton = wrapper.find('[data-testid="submit-trade"]')
  expect(submitButton.exists()).toBe(true)
  expect(submitButton.attributes('disabled')).toBeUndefined()

  await submitButton.trigger('click')
})






