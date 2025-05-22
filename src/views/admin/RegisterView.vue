<template>
  <section class="dark-bg pt-16">
    <div class="flex items-center justify-center">
      <div class="pt-24 flex flex-col gap-4 max-w-md mx-auto">
        <h3 class="text-xl font-semibold light-headline text-center">Sign up</h3>

        <input
          type="text"
          class="flex light-bg p-2 round-corner dark-text"
          placeholder="Name"
          v-model="username"
          autocomplete="username"
        />
        <input
          type="email"
          class="flex light-bg p-2 round-corner dark-text"
          placeholder="Email"
          v-model="email"
          autocomplete="email"
        />
        <input
          type="password"
          class="flex light-bg p-2 round-corner dark-text"
          placeholder="Password"
          v-model="password"
          autocomplete="new-password"
        />

        <button class="btn-1" @click="handleRegister">Register</button>

        <p class="light-text text-sm pt-2">
          Already have an account?
          <RouterLink to="/auth">
            <span class="log-in underline">Log in now</span>
          </RouterLink>
        </p>

        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
        <div v-if="registrationSuccess">
          <p class="text-sm text-green-500 mt-2">Registering user successful!</p>
          <RouterLink to="/auth">
            <button class="btn-1">Go to log in page</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUsers } from '../../modules/auth/userModels';
import { scrollToTop } from '../../modules/scrollToTop/TopRouterView';


// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});

// fetch the functions needed for the register page
const { registerUser, username, email, password } = useUsers();
const router = useRouter();
const error = ref('');
const registrationSuccess = ref(false);

// register user function
const handleRegister = async () => {
  registrationSuccess.value = false;
  error.value = '';

  try {
    await registerUser(username.value, email.value, password.value);
    registrationSuccess.value = true;

    // redirect to login page after success
    router.push('/auth');
  } catch (err: unknown) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = 'Something went wrong.';
    }
  }
};
</script>

<style scoped>
/* log in btn */
.log-in {
  transition: 0.3s;
}

.log-in:hover {
  color: var(--dark-headline)
}
</style>