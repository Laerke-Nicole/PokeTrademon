import { test, expect, vi, beforeEach } from 'vitest';
import { useCollection } from '../../modules/useCollection';


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
      json: async () => ({ collection: [] }),
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
  // fetch collection with userId 1
  await fetchCollection('1');

  // what to expect
  expect(collection.value).toEqual([]);
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

    // fetch collection with userId 1
    const result = await fetchCollection('1')

    expect(result).toBeUndefined()
})