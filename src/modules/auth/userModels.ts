import { ref } from 'vue';
import type { User } from '../../interfaces/user';

export const useUsers = () => {
  const token = ref<string | null>(null);
  const isLoggedIn = ref<boolean>(false);
  const error = ref<string | null>(null);
  const user = ref<User | null>(null);

  const username = ref<string>('');
  const email = ref<string>('');
  const password = ref<string>('');

  const BASE_URL = 'http://localhost:5004/api/auth';

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
  
      localStorage.setItem('isToken', authResponse.token);
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
    localStorage.removeItem('isToken');
    localStorage.removeItem('userIDToken');
    console.log('👋 User logged out');
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
  };
};
