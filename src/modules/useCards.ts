import { ref } from 'vue';
import type { Card, newCard } from '../interfaces/card';

export const useProducts = () => {
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const cards = ref<Card[]>([]);

    // fetch cards
    const fetchCards = async (): Promise<void> => {
        loading.value = true;

        try {
            const response = await fetch('https://ments-restapi.onrender.com/api/products');
            if (!response.ok) {
                throw new Error('No data available');
            }

            const data: Card[] = await response.json();

            cards.value = data;
            console.log("Cards fetched", cards.value);
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
        const token = localStorage.getItem('isToken');
        const userId = localStorage.getItem('userIDToken');

        if (!token) {
            throw new Error('No token available');
        }
        if (!userId) {
            throw new Error('No user ID available');
        }
        return { token, userId };
    }


    // validate card
    const validateCard = (card: newCard): void => {
        if (card.name) {
            throw new Error('Card name is required');
        }
    }

    // filter correct things
    const fetchCardById = async(id: string): Promise<Card[] | null> => {
        try {
            const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`);
            if (!response.ok) {
                throw new Error('No data available');
            }

            const data: Card[] = await response.json();
            console.log("Cards fetched", data);
            // return data/ card if it exists
            return data;
        }
        catch (err) {
            console.log(err);
            // if its null then return null since fetchCardById can either be null or Card[]
            return null;
        }
    }

    return { 
        error, 
        loading, 
        cards, 
        fetchCards,
        getTokenAndUserId,
        fetchCardById,
    }
}