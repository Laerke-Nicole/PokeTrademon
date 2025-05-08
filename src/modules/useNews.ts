import { ref } from 'vue';
import type { News, newProduct } from '../interfaces/news';

export const useProducts = () => {
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);
    const products = ref<Product[]>([]);

    // fetch products
    const fetchProducts = async (): Promise<void> => {
        loading.value = true;

        try {
            const response = await fetch('https://ments-restapi.onrender.com/api/products');
            if (!response.ok) {
                throw new Error('No data available');
            }

            const data: Product[] = await response.json();

            products.value = data;
            console.log("products fetched", products.value);
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


    // validate product
    const validateProduct = (product: newProduct): void => {
        if (product.name) {
            throw new Error('Product name is required');
        }
    }


    // set default values
    const setDefaultValues = (product: newProduct, userId: string) => {
        return {
            name: product.name,
            description: product.description || 'New product description default',
            imageURL: product.imageURL || 'https://picsum.photos/500/500',
            price: product.price || 5,
            stock: product.stock || 50,
            discount: product.discount || false,
            discountPct: product.discountPct || 0,
            isHidden: product.isHidden || false,
            _created: userId
        }
    }


    // add product
    const addProduct = async (product: newProduct): Promise<void> => {
        try {
            const { token, userId } = getTokenAndUserId();
            validateProduct(product)
            const productWithDefaults = setDefaultValues(product, userId);

            const response = await fetch('https://ments-restapi.onrender.com/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token
                },
                body: JSON.stringify(productWithDefaults)
            })

            if (!response.ok) {
                // prints out the specific error message from the server
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'No data available');
            }

            const newProduct: Product = await response.json();
            products.value.push(newProduct);
            console.log("product added", newProduct);
            await fetchProducts();
        }   
        catch (err) {
            error.value = (err as Error).message;
        }
    }


    const deleteProductFromServer = async (id: string, token: string): Promise<void> => {
        const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': token
            }
        })

        if (!response.ok) {
            console.log('Error deleting product');
            throw new Error('No data available');
        }
    }

    const removeProductFromState = (id: string): void => {
        products.value = products.value.filter(product => product._id !== id);
        console.log("products deleted", id);
    }


    // delete product
    const deleteProduct = async (id: string): Promise<void> => {
        try {
            // check if user is logged in to give access to delete
            const { token } = getTokenAndUserId();
            await deleteProductFromServer(id, token);
            removeProductFromState(id);

            console.log("id test", id);
        }
        catch (err) {
            error.value = (err as Error).message;
        }
    }

    const updateProductOnServer = async ( id: string, updatedProduct: Partial<Product>, token: string ): Promise<Product> => {
        const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            body: JSON.stringify(updatedProduct)
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
            return { message: responseText } as unknown as Product;
        }
        // convert into json cuz it cant read javascript
        // return await response.json();
    }

    const updateProductInState = (id: string, updatedProduct: Product) => {
        const index = products.value.findIndex(product => product._id === id);
        // if index is not found. if id is not -1 the product is found
        if (index !== -1) {
            products.value[index] = updatedProduct;
        }
    }

    const updatedProduct = async (id: string, updatedProduct: Partial<Product>): Promise<void> => {
        try {
            const { token } = getTokenAndUserId();
            const updatedProductResponse = await updateProductOnServer(id, updatedProduct, token);
            updateProductInState(id, updatedProductResponse);
            await fetchProducts();
        }
        catch (err) {
            error.value = (err as Error).message;
        }
    }

    // filter correct things
    const fetchProductById = async(id: string): Promise<Product[] | null> => {
        try {
            const response = await fetch(`https://ments-restapi.onrender.com/api/products/${id}`);
            if (!response.ok) {
                throw new Error('No data available');
            }

            const data: Product[] = await response.json();
            console.log("products fetched", data);
            // return data/ product if it exists
            return data;
        }
        catch (err) {
            console.log(err);
            // if its null then return null since fetchProductById can either be null or Product[]
            return null;
        }
    }

    return { 
        error, 
        loading, 
        products, 
        fetchProducts,
        deleteProduct,
        addProduct,
        updatedProduct,
        getTokenAndUserId,
        fetchProductById
    }
}