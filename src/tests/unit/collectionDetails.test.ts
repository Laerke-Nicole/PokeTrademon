import { test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CollectionView from '../../views/CollectionView.vue'
import { ref } from 'vue'

globalThis.scrollTo = vi.fn()

// ✅ Mock useCollection
const mockCollection = [
  {
    cardId: '1',
    quantity: 1,
    condition: 'Mint',
    image: 'https://picsum.photos/500/500',
  },
]

vi.mock('../../modules/useCollection', () => ({
  useCollection: () => ({
    collection: ref(mockCollection),
    loading: ref(false),
    error: ref(null),
    fetchCollection: vi.fn(),
  }),
}))

// ✅ Add this block to mock useUsers and loadUser
vi.mock('../../modules/auth/userModels', () => ({
  useUsers: () => ({
    user: ref({ _id: '1', username: 'TestUser' }),
    isLoggedIn: ref(true),
    token: ref('mock-token'),
    error: ref(null),
    username: ref(''),
    email: ref(''),
    password: ref(''),
    logout: vi.fn(),
    fetchToken: vi.fn(),
    registerUser: vi.fn(),
    loadUser: vi.fn(), // prevents actual fetch call
  }),
  getAuthToken: () => 'mock-token',
}))

// ✅ Mock vue-router
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

  expect(wrapper.text()).toContain('1')
  expect(wrapper.text()).toContain(1)
  expect(wrapper.text()).toContain('Mint')
  expect(wrapper.find('img').attributes('src')).toBe('https://picsum.photos/500/500')
})
