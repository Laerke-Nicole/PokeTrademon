import { ref } from 'vue';
import type { User } from '../../interfaces/user';
import { state } from '../globalStates/state';
import { useRouter } from 'vue-router';
import { getCurrentUser } from './userAPI'


export const useUsers = () => {
  const token = ref<string | null>(null);
  const isLoggedIn = ref<boolean>(false);
  const error = ref<string | null>(null);
  const user = ref<User | null>(null);

  const username = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');

  const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/auth`
  : 'http://localhost:5004/auth';

  const router = useRouter();

  // ✅ LOGIN
  const fetchToken = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error(errorResponse.error || 'Login failed');
        throw new Error(errorResponse.error || 'Login failed');
      }
  
      const authResponse = await response.json();
  
      token.value = authResponse.token;
      isLoggedIn.value = true;
      state.isLoggedIn = true; // ✅ sync with global
  
      localStorage.setItem('isToken', authResponse.token);
      localStorage.setItem('userIDToken', authResponse.userId);
      console.log('✅ Logged in! Token:', authResponse.token);
    } catch (err) {
      error.value = (err as Error).message || 'Login error';
      isLoggedIn.value = false;
    }
  };
  

  // ✅ REGISTER
  const registerUser = async (username: string, email: string, password: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
  
      console.log('✅ User registered successfully:', data);
  
      // You can optionally redirect or clear inputs here
      isLoggedIn.value = false; // Still false until login
      error.value = null;
    } catch (err) {
      error.value = (err as Error).message || 'Error registering';
      console.error('❌ Register Error:', error.value);
    }
  };
  

  // ✅ LOGOUT
  const logout = () => {
    token.value = null;
    user.value = null;
    isLoggedIn.value = false;
    state.isLoggedIn = false; // ✅ sync with global
    localStorage.removeItem('isToken');
    localStorage.removeItem('userIDToken');
    console.log('👋 User logged out');

    // go to home page after logging out
    router.push('/');
  };

  const loadUser = async () => {
    try {
      const data = await getCurrentUser();
      user.value = data;
    } catch (err) {
      console.error("❌ Failed to load user from API", err);
    }
  };

  return {
    token,
    isLoggedIn,
    error,
    user,
    username,
    email,
    password,
    fetchToken,
    registerUser,
    logout,
    loadUser,
  };
};

export const getAuthToken = (): string => {
  return localStorage.getItem('isToken') || '';
};
