import { ref } from 'vue';
import type { User } from '../../interfaces/user';

export const useUsers = () => {
    const token = ref<string | null>(null);
    const isLoggedIn = ref<boolean>(false);
    const error = ref<string | null>(null);
    const user = ref<User | null>(null);

    const name = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');

const fetchToken = async (email:string, password:string): Promise<void> => {
    try {
        const response = await fetch('https://ments-restapi.onrender.com/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('isToken') || ''
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.log(errorResponse.error || 'Error');
            throw new Error('Error');
        }

        const authResponse = await response.json();
        token.value = authResponse.data.token;
        user.value = authResponse.data.user;
        isLoggedIn.value = true;

        localStorage.setItem('isToken', authResponse.data.token);
        localStorage.setItem('userIDToken', JSON.stringify(authResponse.data.userId));
        console.log('user is logged in: ', authResponse);
        console.log('token: ', token.value);
    }

    catch (err) {
        error.value = (err as Error).message || 'Error';
        isLoggedIn.value = false;
    }
    }


    // register user
    const registerUser = async (name:string, email:string, password:string): Promise<void> => {
        try {
            const response = await fetch('https://ments-restapi.onrender.com/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });
    
            if (!response.ok) {
                throw new Error('Error');
            }
    
            const authResponse = await response.json();
            token.value = authResponse.data.token;
            user.value = authResponse.data.user;
    
            localStorage.setItem('isToken', authResponse.data.token);
            console.log('user created: ', authResponse);
        }
    
        catch (err) {
            error.value = (err as Error).message || 'Error';
        }
        }

        const logout = () => {
            token.value = null;
            user.value = null;
            isLoggedIn.value = false;
            localStorage.removeItem('isToken');
            console.log("User is logged out")
        }

    return {
        token,
        isLoggedIn,
        error,
        user,
        name,
        email,
        password,
        fetchToken,
        registerUser,
        logout
    }
}