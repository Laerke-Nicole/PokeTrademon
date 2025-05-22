import { test, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import TradeView from '../../views/TradeView.vue'

// getUserCollection from collectionApi
vi.mock('../../modules/collectionApi', () => ({
  getUserCollection: vi.fn().mockResolvedValue({
    collection: [
      { cardId: 'card001', quantity: 2 },
      { cardId: 'card002', quantity: 1 },
    ]
  })
}));

vi.mock('../../modules/tradeApi', () => ({
  fetchTradesForUser: vi.fn().mockResolvedValue([]),
  createTradeOffer: vi.fn().mockResolvedValue({}),
  acceptTradeOffer: vi.fn()
}));

vi.mock('../../modules/auth/userModels', () => ({
  useUsers: () => ({ user: { value: { _id: '1' } } })
}));

// get userIDToken 
beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'userIDToken') return '"1"';
    return null;
  });
});


// find h1
test('Tradeview renders the my trade offers headline', () => {
    // const wrapper = createWrapper();
    const wrapper = mount(TradeView);

    expect(wrapper.find('[data-testid="my-trade-offers"]').exists()).toBe(true)
})


// pick card from list
test('User picks the card they want to get', async () => {
  const wrapper = mount(TradeView)

  const toggleCardListBtn = wrapper.find('[data-testid="search-input"]')
  await toggleCardListBtn.trigger('click')

  const searchInput = wrapper.find('input[placeholder="Search Pokémon..."]')
  await searchInput.setValue('Pikachu')
  await searchInput.trigger('input')

  // 👉 wait for promises (like fetch or setTimeout) to resolve
  await flushPromises()

  const selectButtons = wrapper.findAll('[data-testid="select-card-button"]')
  if (selectButtons.length > 0) {
    await selectButtons[0].trigger('click')
  }

  const submitButton = wrapper.find('[data-testid="submit-trade"]')
  await submitButton.trigger('click')
})