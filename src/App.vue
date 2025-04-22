<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- navigation -->
   <!-- Navigation Bar -->
   <nav
      class="max-w-6xl mx-auto bg-white rounded-full px-8 py-3 mt-6 flex items-center justify-between shadow-lg"
    >
      <div class="flex items-center space-x-8">
        <div class="pokemon-logo">
          <img
            src="../public/images/pokemon-logo.png"
            alt="Pokemon Logo"
            class="h-10"
          />
        </div>
        <div class="nav-links flex items-center space-x-6">
          <RouterLink to="/">Home</Routerlink>
          <RouterLink to="/market">Market</Routerlink>
          <RouterLink to="/profile">Collection</Routerlink>
          <RouterLink to="/auth">Log in</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/admin">Admin</RouterLink>
          <button v-if="isLoggedIn" @click="logout">Log out</button>
        </div>
      </div>

      <!-- icons -->
      <div class="flex items-center space-x-4">
        <!-- user icon -->
        <!-- <div class="flex items-center space-x-1">
          <i class="fa-solid fa-user text-gray-600 text-lg"></i>
        </div> -->
        <div
          class="relative flex items-center space-x-1 group"
        >
          <i class="fas fa-user text-gray-600 text-lg cursor-pointer"></i>

          <!-- Dropdown shown on hover -->
          <div class="hidden group-hover:block absolute top-full right-0">
            <UserDropdown />
          </div>
        </div>

        <!-- <div class="flex items-center space-x-1">
          <span class="text-gray-700">3</span>
          <i class="fas fa-sync text-gray-600"></i>
        </div>

        <div class="flex items-center space-x-1">
          <span class="text-gray-700">65</span>
          <i class="fa-regular fa-box-open text-gray-600"></i>
        </div> -->

        <!-- notification bell -->
        <div class="flex justify-end relative">
          <i class="fa-regular fa-bell text-gray-600 text-lg"></i>
          <!-- <div v-if="hasNotification"> -->
            <span class="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
          <!-- </div> -->
        </div>
      </div>
    </nav>
  <!-- <header>
    <nav>
      <div>
        <RouterLink to="/market">Market</RouterLink>
      </div>

      <div>
        <RouterLink to="/"><img src="../public/images/pokemon-logo.png" alt="pokemon logo" class="logo"></RouterLink>
      </div>

      <div>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink to="/auth">Log in</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/admin">Admin</RouterLink>

        <button v-if="isLoggedIn" @click="logout">Log out</button>
      </div> 
    </nav>
  </header> -->

  <RouterView />


  <!-- footer -->
  <footer class="flex justify-around five-percent pb-12 pt-12 light-bg">
    <div>
      <h2 class="dark-headline">PokeTrademon</h2>
      <p class="dark-text">Kongensgade 29, 6700 Esbjerg</p>
      <p class="dark-text">+45 23 27 21 09</p>
      <p class="dark-text">Support@Poketrademon.com</p>
    </div>

    <div>
      <p class="dark-text">Market</p>
      <p class="dark-text">About PokeTrademon</p>
      <p class="dark-text">Contact us</p>
      <p class="dark-text">Careers</p>
    </div>

    <div>
      <p class="dark-text">Cookie policy</p>
      <p class="dark-text">Privacy policy</p>
      <p class="dark-text">Cookie settings</p>
      <p class="dark-text">Security</p>
      <p class="dark-text">Copyright PokeTrademon 2025</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { useUsers } from '../src/modules/auth/userModels';
import { computed } from 'vue'
import { state } from './modules/globalStates/state'
import UserDropdown from '../src/components/user/UserDropdownView.vue'

// fetch logout function
const { logout } = useUsers();
const isLoggedIn = computed(() => state.isLoggedIn)

</script>

<style scoped>
nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  display: flex;
  justify-content: space-between;
  background-color: var(--tertiary-color);
  align-items: center;
  position: fixed;
  z-index: 100;
  padding-right: 2rem;
  padding-left: 2rem;
}

nav div {
  flex: 1; 
  display: flex;
  align-items: center;
}

nav div:nth-child(2) { 
  justify-content: center;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: var(--dark-text);
}

.logo {
  width: 150px;
}

footer {
  margin-top: 96px;
}
</style>
