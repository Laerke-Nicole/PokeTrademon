<template>
    <section class="dark-bg pt-16">
        <div class="flex items-center justify-center">
            <div class="pt-24 flex flex-col gap-4 max-w-md mx-auto">
                <h3 class="text-xl font-semibold dark-headline text-center">Sign up</h3>

                <input type="text" class="flex light-bg p-2 round-corner dark-text" placeholder="Name"  v-model="username"/> 
                <input type="text" class="flex light-bg p-2 round-corner dark-text" placeholder="Email"  v-model="email"/> 
                <input type="password" class="flex light-bg p-2 round-corner dark-text" placeholder="Password"  v-model="password"/>

                <button class="btn-1" @click="handleRegister">Register</button>

                <!-- router to register page -->
                <p class="dark-text text-sm pt-2">Already have an account? <RouterLink to="/auth"><span class="log-in underline">Log in now</span></RouterLink></p>
            
                <!-- handle msg whether user signed up or not -->
                <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
                <div v-if="registrationSuccess">
                  <p class="text-sm text-green-500 mt-2">Registering user successful!</p>
                  <RouterLink to="/auth"><button class="btn-1">Go to log in page</button></RouterLink>
                </div>
            </div>
        </div>
  </section>
</template>

<script setup lang="ts">
declare const grecaptcha: any;
import { ref, onMounted } from 'vue';
import { useUsers } from '../../modules/auth/userModels';
import { scrollToTop } from '../../modules/scrollToTop/TopRouterView';


// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});

// fetch the functions needed for the register page
const { registerUser, username, email, password } = useUsers();

const error = ref('');


const registrationSuccess = ref(false);

// check if user registered successfully
// const handleRegister = async () => {
//   registrationSuccess.value = false;
//   error.value = '';
//   try {
//     await registerUser(username.value, email.value, password.value);
//     registrationSuccess.value = true;
//   } catch (err: any) {
//     error.value = err.message || 'Something went wrong.';
//   }
// };

const handleRegister = async () => {
  registrationSuccess.value = false;
  error.value = '';

  grecaptcha.ready(() => {
    grecaptcha.execute('6Le8ID8rAAAAAOQL7iuZd5qt8TyU1oyM0XvlOegX', { action: 'submit' }).then(async (token: string) => {
      try {
        await registerUser(username.value, email.value, password.value, token);
        registrationSuccess.value = true;
      } catch (err: any) {
        error.value = err.message || 'Something went wrong.';
      }
    });
  });
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