import { ref } from 'vue';
import type { Card, newCard } from '../interfaces/card';

export const useCards = () => {
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


    // set default values
    const setDefaultValues = (card: newCard, userId: string) => {
        return {
            name: card.name,
            description: card.description || 'New card description default',
            imageURL: card.imageURL || 'https://picsum.photos/500/500',
            price: card.price || 5,
            stock: card.stock || 50,
            discount: card.discount || false,
            discountPct: card.discountPct || 0,
            isHidden: card.isHidden || false,
            _created: userId
        }
    }


    // add card
    const addCard = async (card: newCard): Promise<void> => {
        try {
            const { token, userId } = getTokenAndUserId();
            validateCard(card)
            const cardWithDefaults = setDefaultValues(card, userId);

            const response = await fetch('https://ments-restapi.onrender.com/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(cardWithDefaults)
            })

            if (!response.ok) {
                // prints out the specific error message from the server
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'No data available');
            }

            const newCard: Card = await response.json();
            cards.value.push(newCard);
            console.log("Card added", newCard);
            await fetchCards();
        }   
        catch (err) {
            error.value = (err as Error).message;
        }
    }


    const deleteCardFromServer = async (id: string, token: string): Promise<void> => {
        const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': token
            }
        })

        if (!response.ok) {
            console.log('Error deleting card');
            throw new Error('No data available');
        }
    }

    const removeCardFromState = (id: string): void => {
        cards.value = cards.value.filter(card => card._id !== id);
        console.log("Cards deleted", id);
    }


    // delete card
    const deleteCard = async (id: string): Promise<void> => {
        try {
            // check if user is logged in to give access to delete
            const { token } = getTokenAndUserId();
            await deleteCardFromServer(id, token);
            removeCardFromState(id);

            console.log("id test", id);
        }
        catch (err) {
            error.value = (err as Error).message;
        }
    }

    const updateCardOnServer = async ( id: string, updatedCard: Partial<Card>, token: string ): Promise<Card> => {
        const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(updatedCard)
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
            return { message: responseText } as unknown as Card;
        }
        // convert into json cuz it cant read javascript
        // return await response.json();
    }

    const updateCardInState = (id: string, updatedCard: Card) => {
        const index = cards.value.findIndex(card => card._id === id);
        // if index is not found. if id is not -1 the card is found
        if (index !== -1) {
            cards.value[index] = updatedCard;
        }
    }

    const updatedCard = async (id: string, updatedCard: Partial<Card>): Promise<void> => {
        try {
            const { token } = getTokenAndUserId();
            const updatedCardResponse = await updateCardOnServer(id, updatedCard, token);
            updateCardInState(id, updatedCardResponse);
            await fetchCards();
        }
        catch (err) {
            error.value = (err as Error).message;
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
        deleteCard,
        addCard,
        updatedCard,
        getTokenAndUserId,
        fetchCardById
    }
}