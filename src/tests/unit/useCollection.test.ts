import { test, expect, vi, beforeEach } from 'vitest';
import { useCollection } from '../../modules/useCollection';

const mockCollection = [{
  cardId: '1',
  quantity: 1,
  condition: 'Used like new',
  image: 'https://picsum.photos/500/500',
}];
    
beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'userIDToken') return '"1"';
    return null;
  });
});

test('Fetch collections', async () => {
  global.fetch = vi.fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ collection: mockCollection }),
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: {
          images: {
            small: 'https://picsum.photos/500/500'
          }
        }
      }),
    });

  const { fetchCollection, collection } = useCollection();
  await fetchCollection();
  expect(collection.value).toEqual(mockCollection);
});



// test fetching collection with an error
test('Fetch collection error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({})
    })

    const { fetchCollection } = useCollection()
    const result = await fetchCollection()
    expect(result).toBeNull()
})


// test if loading is working during the fetch
test('Test loading during the fetch', async () => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCollection
    })

    const { fetchCollection, loading } = useCollection()
    
    const fetchPromise = fetchCollection()
    // check if loading is true before the fetch
    expect(loading.value).toBe(true)

    await fetchPromise
    // check if loading is false after the fetch
    expect(loading.value).toBe(false)
})