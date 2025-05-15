import { test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TradeView from '../../views/TradeView.vue'

// make wrapper global cuz it needs to be used in all tests
const wrapper = mount(TradeView)

test('User creates a trade offer', async () => {
  // click on direct toggle
  const directToggle = wrapper.find('[data-testid="direct-toggle"]');
  await directToggle.trigger('click');
  expect(wrapper.text()).toContain('Direct');

  // write receivers username
  const usernameInput = wrapper.find('[data-testid="receiver-username"]');
  await usernameInput.setValue('jane doe');
  expect((usernameInput.element as HTMLInputElement).value).toBe('jane doe');

  // select your own card from dropdown
  const dropdown = wrapper.find('select');
  await dropdown.setValue('card001');
  expect(dropdown.element.value).toBe('card001');

  // click "add" button
  const addButton = wrapper.find('[data-testid="add-card"]');
  await addButton.trigger('click');

  // toggle "show card list"
  const toggleCardListBtn = wrapper.find('button.text-blue-600');
  await toggleCardListBtn.trigger('click');

  // search for pikachu in input field
  const searchInput = wrapper.find('input[placeholder="Search Pokémon..."]');
  await searchInput.setValue('pikachu');
  await searchInput.trigger('input');

  // Wait for DOM to update (fake result)
//   await wrapper.vm.$nextTick();

  // click first card in search result
  const selectButtons = wrapper.findAll('button.btn-1');
  if (selectButtons.length > 0) {
    await selectButtons[0].trigger('click');
  }

  // submit the trade offer on the btn
  const submitButton = wrapper.find('[data-testid="submit-trade"]');
  await submitButton.trigger('click');

  // assertion 
  expect(wrapper.text()).toContain('Trade offer sent'); 
});