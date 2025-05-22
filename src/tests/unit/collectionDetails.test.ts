import { test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CollectionView from '../../views/CollectionView.vue'
import { ref } from 'vue'

globalThis.scrollTo = vi.fn()

// make a mock collection
const mockCollection = [
  {
    cardId: '1',
    quantity: 1,
    condition: 'Mint',
    image: 'https://picsum.photos/500/500',
  },
]

// takes useCollection and returns collection, loading, error, and fetchCollection
vi.mock('../../modules/useCollection', () => ({
  useCollection: () => ({
    collection: ref(mockCollection),
    loading: ref(false),
    error: ref(null),
    fetchCollection: vi.fn(),
  }),
}))

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: '1' },
  }),
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

test('Renders collection details', async () => {
  const wrapper = mount(CollectionView)

  await new Promise((resolve) => setTimeout(resolve, 0))

  // what to expect
  expect(wrapper.text()).toContain('1')
  expect(wrapper.text()).toContain(1)
  expect(wrapper.text()).toContain('Mint')
  expect(wrapper.find('img').attributes('src')).toBe('https://picsum.photos/500/500')
})
