import { ref } from 'vue';
import type { User } from '../../interfaces/user';
import { state } from '../globalStates/state';
import { useRouter } from 'vue-router';
import { getCurrentUser } from './userAPI';

export const useUsers = () => {
  const token = ref<string | null>(localStorage.getItem('isToken'));
  const isLoggedIn = ref<boolean>(!!token.value);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Login failed');
      }

      const authResponse = await response.json();
      token.value = authResponse.token;
      isLoggedIn.value = true;
      state.isLoggedIn = true;

      localStorage.setItem('isToken', authResponse.token);
      localStorage.setItem('userIDToken', authResponse.userId);
    } catch (err) {
      error.value = (err as Error).message || 'Login error';
      isLoggedIn.value = false;
      state.isLoggedIn = false;
    }
  };

  // ✅ REGISTER
  const registerUser = async (username: string, email: string, password: string, recaptchaToken: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, recaptchaToken }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');

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
    state.isLoggedIn = false;
    localStorage.removeItem('isToken');
    localStorage.removeItem('userIDToken');
    router.push('/');
  };

  // ✅ LOAD CURRENT USER
  const loadUser = async () => {
    try {
      const data = await getCurrentUser();
      user.value = data;
      isLoggedIn.value = true;
      state.isLoggedIn = true;
    } catch (err) {
      user.value = null;
      isLoggedIn.value = false;
      state.isLoggedIn = false;
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

// ✅ Export localStorage-based token (for fetch headers)
export const getAuthToken = (): string => {
  return localStorage.getItem('isToken') || '';
};
