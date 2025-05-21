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
          <li v-if="user" class="w-full px-4 py-2">Welcome back <span class="user-name">{{ user.username.trim() }}!</span></li>
          <li v-else class="w-full px-4 py-2 italic text-gray-500">Loading user name...</li>
          <hr class="user-hr">
        </div>

        <div v-if="readyToShowLinks && isUser">
        <RouterLink to="/profile/edit">
          <li class="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Profile</li>
        </RouterLink>
        </div>

        <div>  
          <div v-if="readyToShowLinks && isUser">
            <RouterLink to="/collection">
              <li class="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Your collection</li>
            </RouterLink>
          </div>  
          <li v-else-if="readyToShowLinks && isUser === null" class="w-full px-4 py-2 italic text-gray-500">Loading your collection...</li>
        </div>

        <div>
          <div v-if="readyToShowLinks && isUser">
            <RouterLink to="/trades">
              <li class="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Trades</li>
            </RouterLink>
          </div>
          <li v-else-if="readyToShowLinks && isUser === null" class="w-full px-4 py-2 italic text-gray-500">Loading trades page...</li>
        </div>

        <div>
          <div v-if="readyToShowLinks && isAdmin">
            <RouterLink to="/trades">
              <li class="w-full px-4 py-2 hover:bg-gray-100 cursor-pointer">Admin page</li>
            </RouterLink>
          </div>
          <li v-else-if="readyToShowLinks && isAdmin === null" class="w-full px-4 py-2 italic text-gray-500">Loading admin page...</li>
        </div>

        <hr class="my-2 border-gray-300" />
        <button v-if="state.isLoggedIn" @click="logout" class="hover:bg-gray-100 w-full text-left px-4 py-2 underline cursor-pointer">Log out</button>
      </ul>
    </div>


    
</template>
  

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useUsers } from '../../modules/auth/userModels';
import { state } from '../../modules/globalStates/state';

// fetch needed stuff from users
const { user, logout, loadUser } = useUsers();

onMounted(async () => {
  if (state.isLoggedIn) {
    await loadUser()
  } 
})

// checking if user is admin or just user
const isUser = computed(() => user.value?.userRole === 'user' || state.userRole === 'user')
const isAdmin = computed(() => user.value?.userRole === 'admin' || state.userRole === 'admin')

const readyToShowLinks = computed(() => state.isLoggedIn && (user.value || state.userRole))


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
  