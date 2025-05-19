<template>
  <section class="dark-bg flex flex-col items-center justify-center">
    <div class="pt-24 w-full max-w-xl mx-auto px-40">
      <h2 class="pt-16 text-center pb-6">Edit Your Profile</h2>
  
      <form @submit.prevent="updateProfile" class="space-y-4">
        <div>
          <label class="block pb-1">Username</label>
          <input v-model="form.username" type="text" class="input w-full" />
        </div>
  
        <div>
          <label class="block pt-4 pb-1">Email</label>
          <input v-model="form.email" type="email" class="input w-full" />
        </div>
  
        <div>
          <label class="block pt-4 pb-1">New Password</label>
          <input v-model="form.password" type="password" class="input w-full" placeholder="Leave blank to keep current" />
        </div>
  
        <div class="pt-6">
          <button type="submit" class="btn-1 w-full">
            Update Profile
          </button>
        </div>
      </form>
  
      <div class="pt-4 text-center">
        <button @click="deleteAccount" class="text-sm text-red-600 hover:underline">
          Delete Account
        </button>
      </div>
  
      <div v-if="message" class="pt-4 text-center text-green-600">
        {{ message }}
      </div>
    </div>
  </section>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { scrollToTop } from '../modules/scrollToTop/TopRouterView';
  import { useRouter } from 'vue-router';
  import { useUsers } from '../modules/auth/userModels';
  import { updateUser, deleteUser } from '../modules/auth/userAPI';
  
  const router = useRouter();
  const { user, logout, loadUser } = useUsers();
  
  const form = ref({
    username: '',
    email: '',
    password: '',
  });
  
  const message = ref('');
  
  onMounted(async () => {
  await loadUser(); // fetch from API and populate user.value

  if (user.value) {
    form.value.username = user.value.username;
    form.value.email = user.value.email;
  }
});

  
const updateProfile = async () => {
  try {
    const payload = {
      username: form.value.username?.trim() || '',
      email: form.value.email?.trim() || '',
      password: form.value.password?.trim() || undefined,
    };

    if (!payload.username || !payload.email) {
      message.value = 'Username and email are required';
      return;
    }

    await updateUser(payload);
    message.value = '✅ Profile updated successfully!';
    setTimeout(() => {
      message.value = '';
    }, 3000);
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

  // start at the top of the page
  onMounted(() => {
    scrollToTop(); 
  });
  </script>
  
  <style scoped>
  .input {
    background-color: #ffffff;
    padding: 0.5rem;
    border-radius: 10px;
  }
  </style>
  