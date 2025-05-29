import { test, expect, vi, beforeEach } from 'vitest'
import { useCollection } from '../../modules/useCollection'

// mock collection
const mockCollection = [
  {
    cardId: '1',
    quantity: 1,
    condition: 'Used like new',
    image: 'https://picsum.photos/500/500',
    name: 'Test Card',
  },
]

beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'userIDToken') return '1'
    if (key === 'isToken') return 'test-token'
    return null
  })
})

test('Fetch collections', async () => {
  global.fetch = vi
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        collection: [
          {
            cardId: '1',
            quantity: 1,
            condition: 'Used like new',
          },
        ],
      }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          name: 'Test Card',
          images: { small: 'https://picsum.photos/500/500' },
        },
      }),
    })

  const { fetchCollection, collection } = useCollection()
  await fetchCollection('1')
  expect(collection.value).toEqual(mockCollection)
})

test('Fetch collection error', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
    statusText: 'Not Found',
    json: async () => ({ collection: [] }),
  })

  const { fetchCollection, error } = useCollection()
  const result = await fetchCollection('1')
  expect(result).toBeUndefined()
  expect(error.value).toBe('Failed to fetch collection')
})
