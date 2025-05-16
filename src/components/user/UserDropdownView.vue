<template>
    <div v-if="state" class="dropdown absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-10 p-2">
      <ul class="text-sm text-gray-700 flex flex-col w-full">
        <div v-if="!state.isLoggedIn">
            <RouterLink to="/auth">
            <button class="btn-2 w-full text-center px-4 py-2">Log in</button>
            </RouterLink>
        </div>
  
        <RouterLink to="/register">
          <div v-if="!state.isLoggedIn">
              <li class="w-full px-4 py-2 underline cursor-pointer">Register now</li>
          </div>
        </RouterLink>
  
        <div v-if="state.isLoggedIn">
          <li v-if="user" class="w-full px-4 py-2">Welcome back <span class="user-name">{{ user.username }}!</span></li>
          <li v-else class="w-full px-4 py-2 italic text-gray-500">Loading user info...</li>
          <hr class="user-hr">
        </div>

        <RouterLink to="/profile/edit">
          <li class="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Profile</li>
        </RouterLink>


        <RouterLink to="/collection">
          <div v-if="state.isLoggedIn">
            <li class="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Your collection</li>
          </div>  
        </RouterLink>

        <RouterLink to="/trades">
          <div v-if="state.isLoggedIn">
            <li class="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Trades</li>
          </div>
        </RouterLink>
        <hr class="my-2 border-gray-300" />
        <button v-if="state.isLoggedIn" @click="logout" class="hover:bg-gray-100 w-full text-left px-4 py-2 underline cursor-pointer">Log out</button>
      </ul>
    </div>


    
</template>
  

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUsers } from '../../modules/auth/userModels';
import { state } from '../../modules/globalStates/state';

// fetch needed stuff from users
const { user, logout, loadUser } = useUsers();

onMounted(async () => {
  await loadUser(); 
})
</script>

<style scoped>
.dropdown {
  border: 1px solid var(--dark-headline);
  width: 200px;
}

.dropdown ul {
  width: 100%;
}

.user-name {
  font-weight: bold;
}

.user-hr {
  border: 1px solid #d7d7d7;
  margin: 0.5rem 10px;
}
</style>
  