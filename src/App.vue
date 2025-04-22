<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- navigation -->
  <header class="fixed top-6 left-0 right-0 z-50">
    <nav class="w-full">
      <div class="max-w-screen-xl mx-auto bg-white rounded-full px-8 py-3 flex items-center justify-between shadow-lg">
        <div class="flex items-center space-x-8">
          <RouterLink to="/">
          <div class="logo">
            <img
              src="../public/images/pokemon-logo.png"
              alt="Pokemon Logo"
              class="h-10"
            />
          </div>
        </RouterLink>
          <div class="nav-links flex items-center space-x-6 pl-6">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/market">Market</RouterLink>
            <RouterLink to="/profile">Collection</RouterLink>
            <RouterLink v-if="isLoggedIn" to="/admin">Admin</RouterLink>
          </div>
        </div>

        <!-- icons -->
        <div class="flex space-x-8">
          <div class="user-icon relative flex space-x-1" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
            <RouterLink to="/auth">
              <i class="fas fa-user text-lg cursor-pointer"></i>
            </RouterLink>
            <div v-if="isHovered" class="absolute top-full right-0 z-50">
              <div class="w-40">
                <UserDropdown />
              </div>
            </div>
          </div>

          <RouterLink to="/notification">
          <div class="flex relative">
              <i class="fa-regular fa-bell text-lg"></i>
              <span class="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
            </div>
          </RouterLink>
        </div>
      </div>
    </nav>
  </header>


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
import { computed, ref } from 'vue'
import { state } from './modules/globalStates/state'
import UserDropdown from '../src/components/user/UserDropdownView.vue'

// fetch logout function
const isLoggedIn = computed(() => state.isLoggedIn)
const isHovered = ref(false)
</script>

<style scoped>
header {
  padding: 0 24px;
}

nav {
  font-size: 15px;
  width: 100%;
}

nav a.router-link-exact-active {
  text-decoration: underline;
  color: red;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  color: var(--dark-text);
}


.user-icon {
  padding: 0 1rem;
}

i {
  color: var(--dark-text);
}

footer {
  margin-top: 96px;
}

</style>
