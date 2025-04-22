<template>
    <div class="pt-24 flex flex-col gap-4 five-percent max-w-md mx-auto">
      <h3 class="text-xl font-semibold">Login to your account</h3>
  
      <input
        type="text"
        class="light-bg p-2 round-corner dark-text"
        placeholder="Email"
        v-model="email"
      />
      <input
        type="password"
        class="light-bg p-2 round-corner dark-text"
        placeholder="Password"
        v-model="password"
      />
  
      <button class="btn-1" @click="handleLogin">Login</button>
  
      <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      <p v-if="isLoggedIn" class="text-green-500 text-sm mt-2">🎉 Login successful!</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useUsers } from '../../modules/auth/userModels';
  
  const { fetchToken, email, password, error, isLoggedIn } = useUsers();
  
  const handleLogin = async () => {
    await fetchToken(email.value, password.value);
  };
  </script>
  
  <style scoped>
  /* Optional: Add your styles here */
  </style>
  