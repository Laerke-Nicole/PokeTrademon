import { test, expect, vi } from 'vitest'
import { useNews } from '../../modules/useNews'

// mock news
const mockNews = [
  {
    _id: '1',
    title: 'News 1',
    subTitle: 'Subtitle 1',
    text: 'About text',
    imageURL: 'https://picsum.photos/500/500',
    date: '12-05-2025',
    theme: 'Upcoming',
    isHidden: false,
  },
]

// test fetching news
test('Fetch news', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => mockNews,
  })

  const { fetchNewsById } = useNews()
  const result = await fetchNewsById('1')
  expect(result).toEqual(mockNews)
})

// test fetching news with an error
test('Fetch news error', async () => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 404,
    statusText: 'Not Found',
    json: async () => ({}),
  })

  const { fetchNewsById } = useNews()
  const result = await fetchNewsById('bad-id')

  // what to expect
  expect(result).toBeNull()
})
