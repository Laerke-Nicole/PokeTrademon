import { test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import NewsDetails from '../../views/NewsDetail.vue';

const mockNews = [{
    _id: '1',
    title: 'News 1',
    subTitle: 'Subtitle 1',
    text: 'About text',
    imageURL: 'https://picsum.photos/500/500',
    date: '12-05-2025',
    theme: 'Upcoming',
    isHidden: false,
}]

vi.mock('../../modules/useNews', () => ({
    useNews: () => ({
        fetchNewsById: vi.fn().mockResolvedValue(mockNews),
    })
}))

vi.mock('vue-router', () => ({
    useRoute: () => ({
        params: 
            { id: '1' ,}
    })
}))

test('Renders news details', async () => {
    const wrapper = mount(NewsDetails)
    await new Promise(resolve => setTimeout(resolve, 0)); // wait for async fetchNewsById to resolve
    expect(wrapper.text()).toContain('News 1')
    expect(wrapper.text()).toContain('Subtitle 1')
    expect(wrapper.text()).toContain('About text')
    expect(wrapper.find('img').attributes('src')).toBe('https://picsum.photos/500/500')
    expect(wrapper.text()).toContain('12-05-2025')
    expect(wrapper.text()).toContain('Upcoming')
})