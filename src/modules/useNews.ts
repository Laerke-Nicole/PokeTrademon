import { ref } from 'vue';
import type { News, newNews } from '../interfaces/news';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004/api';
const NEWS_URL = `${BASE_URL}/news`;

export const useNews = () => {
  const news = ref<News[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchNews = async (): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      const res = await fetch(NEWS_URL);
      if (!res.ok) throw new Error('Failed to fetch news');
      news.value = await res.json();
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false;
    }
  };

  const getTokenAndUserId = (): { token: string, userId: string } => {
    const token = localStorage.getItem('lsToken');
    const userId = localStorage.getItem('userIDToken');

    if (!token) {
        throw new Error('No token available');
    }
    if (!userId) {
        throw new Error('No user ID available');
    }
    return { token, userId };
  }

  const addNews = async (newsData: newNews): Promise<void> => {
    try {
      const { token, userId } = getTokenAndUserId();
      if (!newsData.title) throw new Error('Title is required');

      const payload = {
        title: newsData.title,
        subTitle: newsData.subTitle || 'Default Subtitle',
        text: newsData.text || 'Default text',
        imageURL: newsData.imageURL || 'https://picsum.photos/500',
        isHidden: newsData.isHidden || false,
        userId,
      };

      const res = await fetch(NEWS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to add news');
      }

      const added = await res.json();
      news.value.push(added);
      await fetchNews();
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const deleteNews = async (id: string): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();

      const res = await fetch(`${NEWS_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token,
        },
      });

      if (!res.ok) throw new Error('Failed to delete news');
      news.value = news.value.filter(n => n._id !== id);
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const updateNews = async (id: string, updatedFields: Partial<News>): Promise<void> => {
    try {
      const { token } = getTokenAndUserId();

      const res = await fetch(`${NEWS_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        body: JSON.stringify(updatedFields),
      });

      if (!res.ok) throw new Error('Failed to update news');
      const updated = await res.json();
      const index = news.value.findIndex(n => n._id === id);
      if (index !== -1) news.value[index] = updated;
    } catch (err) {
      error.value = (err as Error).message;
    }
  };

  const fetchNewsById = async (id: string): Promise<News | null> => {
    try {
      const res = await fetch(`${NEWS_URL}/${id}`);
      if (!res.ok) throw new Error('Failed to fetch news by ID');
      return await res.json();
    } catch (err) {
      error.value = (err as Error).message;
      return null;
    }
  };


  return {
    news,
    loading,
    error,
    fetchNews,
    fetchNewsById,
    addNews,
    deleteNews,
    updateNews,
    getTokenAndUserId,
  };
};
