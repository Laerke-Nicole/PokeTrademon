import { ref } from 'vue';
import type { News, newNews } from '../interfaces/news';
import { sub } from 'three/tsl';

export const useNews = () => {
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const news = ref<News[]>([]);

    // fetch news
    const fetchNews = async (): Promise<void> => {
        loading.value = true;

        try {
            const response = await fetch('https://ments-restapi.onrender.com/api/products');
            if (!response.ok) {
                throw new Error('No data available');
            }

            const data: News[] = await response.json();
            news.value = data;
            console.log("News fetched", news.value);
        } 
        catch (err) {
            error.value = (err as Error).message;
        } 
        finally {
            loading.value = false; // always set loading to false
        }
    }


    // get token and user ID
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


    // validate news
    const validateNews = (news: newNews): void => {
        if (news.title) {
            throw new Error('News title is required');
        }
    }


    // set default values
    const setDefaultValues = (news: newNews, userId: string) => {
        return {
            title: news.title,
            subTitle: news.subTitle || 'New news sub title default',
            text: news.text || 'New news text default',
            imageURL: news.imageURL || 'https://picsum.photos/500/500',
            date: news.date || new Date().toISOString(),
            theme: news.theme || 'New news theme default',
            author: news.author || userId,
            isHidden: news.isHidden || false
        }
    }


    // add news
    const addNews = async (news: newNews): Promise<void> => {
        try {
            const { token, userId } = getTokenAndUserId();
            validateNews(news)
            const newsWithDefaults = setDefaultValues(news, userId);

            const response = await fetch('https://ments-restapi.onrender.com/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(newsWithDefaults)
            })

            if (!response.ok) {
                // prints out the specific error message from the server
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'No data available');
            }

            const newNews: News = await response.json();
            news.value.push(newNews);
            console.log("News added", newNews);
            await fetchNews();
        }   
        catch (err) {
            error.value = (err as Error).message;
        }
    }


    const deleteNewsFromServer = async (id: string, token: string): Promise<void> => {
        const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': token
            }
        })

        if (!response.ok) {
            console.log('Error deleting news');
            throw new Error('No data available');
        }
    }

    const removeNewsFromState = (id: string): void => {
        news.value = news.value.filter(news => news._id !== id);
        console.log("News deleted", id);
    }


    // delete news
    const deleteNews = async (id: string): Promise<void> => {
        try {
            // check if user is logged in to give access to delete
            const { token } = getTokenAndUserId();
            await deleteNewsFromServer(id, token);
            removeNewsFromState(id);

            console.log("id test", id);
        }
        catch (err) {
            error.value = (err as Error).message;
        }
    }

    const updateNewsOnServer = async ( id: string, updatedNews: Partial<News>, token: string ): Promise<News> => {
        const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(updatedNews)
        })
        if (!response.ok) {
            throw new Error('No data available');
        }

        const responseText = await response.text();
        try {
            return JSON.parse(responseText);
        }
        catch {
            // convert into an unknown
            return { message: responseText } as unknown as News;
        }
        // convert into json cuz it cant read javascript
        // return await response.json();
    }

    const updateNewsInState = (id: string, updatedNews: News) => {
        const index = news.value.findIndex(news => news._id === id);
        // if index is not found. if id is not -1 the news is found
        if (index !== -1) {
            news.value[index] = updatedNews;
        }
    }

    const updatedNews = async (id: string, updatedNews: Partial<News>): Promise<void> => {
        try {
            const { token } = getTokenAndUserId();
            const updatedNewsResponse = await updateNewsOnServer(id, updatedNews, token);
            updateNewsInState(id, updatedNewsResponse);
            await fetchNews();
        }
        catch (err) {
            error.value = (err as Error).message;
        }
    }

    // filter correct things
    const fetchNewsById = async(id: string): Promise<News[] | null> => {
        try {
            const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`);
            if (!response.ok) {
                throw new Error('No data available');
            }

            const data: News[] = await response.json();
            console.log("News fetched", data);
            // return data/ news if it exists
            return data;
        }
        catch (err) {
            console.log(err);
            // if its null then return null since fetchNewsById can either be null or News[]
            return null;
        }
    }

    return { 
        error, 
        loading, 
        news, 
        fetchNews,
        deleteNews,
        addNews,
        updatedNews,
        getTokenAndUserId,
        fetchNewsById
    }
}