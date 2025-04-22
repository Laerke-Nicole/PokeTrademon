<template>
    <div class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10">
        <ul class="text-sm text-gray-700">
        <RouterLink to="/auth"><button class="btn-1 px-4 py-2">Log in</button></RouterLink>
        <li class="hover:bg-gray-100 px-4 py-2 cursor-pointer">Register now</li>
        <hr>
        <RouterLink to="/profile"><li class="hover:bg-gray-100 px-4 py-2 cursor-pointer">Your collection</li></Routerlink>
        <button v-if="isLoggedIn" @click="logout" class="hover:bg-gray-100 px-4 py-2 cursor-pointer">Log out</button>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useUsers } from '../../modules/auth/userModels';
import { state } from '../../modules/globalStates/state'
import { computed } from 'vue'

// fetch logout function
const { logout } = useUsers();
const isLoggedIn = computed(() => state.isLoggedIn)
</script>

<style scoped>

</style>
  