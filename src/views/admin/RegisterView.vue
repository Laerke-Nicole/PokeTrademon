<template>
    <section class="dark-bg pt-16">
        <div class="flex items-center justify-center">
            <div class="pt-24 flex flex-col gap-4 max-w-md mx-auto">
                <h3 class="text-xl font-semibold dark-headline text-center">Sign up</h3>

                <input type="text" class="flex light-bg p-2 round-corner dark-text" placeholder="Name"  v-model="username"/> 
                <input type="text" class="flex light-bg p-2 round-corner dark-text" placeholder="Email"  v-model="email"/> 
                <input type="password" class="flex light-bg p-2 round-corner dark-text" placeholder="Password"  v-model="password"/>

                <button class="btn-1" @click="registerUser(username, email, password)">Register</button>

                <!-- router to register page -->
                <p class="dark-text text-sm pt-2">Already have an account? <RouterLink to="/auth"><span class="log-in underline">Log in now</span></RouterLink></p>
            
                <!-- handle msg whether user signed up or not -->
                <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
            </div>
        </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUsers } from '../../modules/auth/userModels';

// fetch the functions needed for the register page
const { registerUser, username, email, password } = useUsers();

const error = ref('');

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