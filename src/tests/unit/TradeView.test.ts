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


// user cards
test('User chooses their card to trade', async () => {
    const wrapper = mount(TradeView);

    await flushPromises()

    // toggle the direct btn
    const directToggle = wrapper.find('[data-testid="direct-toggle"]');
    expect(directToggle.exists()).toBe(true);

    await directToggle.trigger('click');
    expect(wrapper.text()).toContain('Direct');

    // write the username in the input field
    const usernameInput = wrapper.find('[data-testid="receiver-username"]');
    await usernameInput.setValue('jane doe');
    expect((usernameInput.element as HTMLInputElement).value).toBe('jane doe');

    // choose the card to trade
    const dropdown = wrapper.find('[data-testid="user-card-dropdown"]');
    await dropdown.setValue('card001');

    expect((dropdown.element as HTMLSelectElement).value).toBe('card001');

    // add the card to the trade offer
    const addCardButton = wrapper.find('[data-testid="user-card-add"]');
    await addCardButton.trigger('click');

    // assertion
    expect(addCardButton.exists()).toBe(true);
});


// pick card from list
test('User picks the card they want to get', async () => {
    const wrapper = mount(TradeView);

    // toggle "show card list"
    const toggleCardListBtn = wrapper.find('[data-testid="search-input"]');
    await toggleCardListBtn.trigger('click');

    // search for pikachu in input field
    const searchInput = wrapper.find('input[placeholder="Search Pokémon..."]');
    await searchInput.setValue('Pikachu');
    await searchInput.trigger('input');

    // click first card in search result
    const selectButtons = wrapper.findAll('[data-testid="select-card-button"]');
    if (selectButtons.length > 0) {
    await selectButtons[0].trigger('click');
    }

    // submit the trade offer on the btn
    const submitButton = wrapper.find('[data-testid="submit-trade"]');
    await submitButton.trigger('click');

    // assertion 
    expect(wrapper.text()).toContain('My Trade OffersIncoming Offers Outgoing Offers Completed Offers Browse Open OffersNo incoming offers yet.Create a Trade Offer Direct  Open Receiver Username:Select Your Cards:-- Choose a card --card001 (You have: 2) card002 (You have: 1) AddSelect Requested Cards:Hide card listAll SupertypesPokémonTrainerEnergySort byName (A–Z)Name (Z–A)HP (Low–High)HP (High–Low)RaritySet NameLoading...Send Trade Offer');
});