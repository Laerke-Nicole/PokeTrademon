<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4 text-center">Edit Your Profile</h2>
  
      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label class="block font-medium mb-1">Username</label>
          <input v-model="form.username" type="text" class="input w-full" />
        </div>
  
        <div>
          <label class="block font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" class="input w-full" />
        </div>
  
        <div>
          <label class="block font-medium mb-1">New Password</label>
          <input v-model="form.password" type="password" class="input w-full" placeholder="Leave blank to keep current" />
        </div>
  
        <button type="submit" class="btn w-full bg-blue-600 text-white hover:bg-blue-700">
          Update Profile
        </button>
      </form>
  
      <div class="mt-6 text-center">
        <button @click="deleteAccount" class="text-sm text-red-600 hover:underline">
          Delete Account
        </button>
      </div>
  
      <div v-if="message" class="mt-4 text-center text-green-600">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUsers } from '@/modules/auth/userModels';
  import { updateUser, deleteUser } from '../modules/auth/userAPI';
  
  const router = useRouter();
  const { user, logout } = useUsers();
  
  const form = ref({
    username: '',
    email: '',
    password: '',
  });
  
  const message = ref('');
  
  onMounted(() => {
    if (user.value) {
      form.value.username = user.value.username;
      form.value.email = user.value.email;
    }
  });
  
  const updateProfile = async () => {
    try {
      await updateUser(form.value);
      message.value = 'Profile updated successfully!';
    } catch (err) {
      console.error(err);
      message.value = 'Failed to update profile.';
    }
  };
  
  const deleteAccount = async () => {
    const confirmed = confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (!confirmed) return;
  
    try {
      await deleteUser();
      logout();
      router.push('/auth');
    } catch (err) {
      console.error(err);
      message.value = 'Failed to delete account.';
    }
  };
  </script>
  
  <style scoped>
  .input {
    border: 1px solid #ccc;
    padding: 0.5rem;
    border-radius: 0.375rem;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    font-weight: 600;
    border-radius: 0.375rem;
  }
  </style>
  