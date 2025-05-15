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
      json: async () => ({ collection: [] })
    })

    const { fetchCollection, error } = useCollection()
    const result = await fetchCollection()
    expect(result).toBeUndefined()
})