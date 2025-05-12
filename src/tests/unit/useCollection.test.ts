import { test , expect, vi } from 'vitest' // import vi when making more advanced tests
import { useCollection } from '../../modules/useCollection'

const mockCollection = [{
    _id: '1',
    name: 'Product 1',
    description: 'Description 1',
    imageURL: 'https://picsum.photos/500/500',
    price: 10,
    stock: 5,
    discount: false,
    discountPct: 0,
    isHidden: false,
}]

test('Fetch collections', async () => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockCollection,
    })

    const { fetchCollectionById } = useCollection()
    const result = await fetchCollectionById('1')
    expect(result).toEqual(mockCollection)
})

test('Fetch collection error', async () => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({})
    })

    const { fetchCollectionById } = useCollection()
    const result = await fetchCollectionById('bad-id')
    expect(result).toBeNull()
})