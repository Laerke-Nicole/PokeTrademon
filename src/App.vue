<template>
  <!-- navigation -->
  <header class="fixed top-6 left-0 right-0 z-50">
    <nav class="w-full">
      <div class="max-w-screen-xl mx-auto bg-white rounded-full px-8 py-3 flex items-center justify-between shadow-lg">
        <div class="flex items-center space-x-8">
          <RouterLink to="/">
            <div class="pokemon-logo">
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
            <RouterLink v-if="state.isLoggedIn" to="/admin">Admin</RouterLink>
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

          <div class="flex relative">
            <i class="fa-regular fa-bell text-lg"></i>
            <span class="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2"></span>
          </div>
        </div>
      </div>
    </nav>
  </header>



  <RouterView />


  <div class="bg-white">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#B9D6E5" fill-opacity="1" d="M0,160L34.3,144C68.6,128,137,96,206,106.7C274.3,117,343,171,411,197.3C480,224,549,224,617,197.3C685.7,171,754,117,823,128C891.4,139,960,213,1029,224C1097.1,235,1166,181,1234,181.3C1302.9,181,1371,235,1406,261.3L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
  </div>

  <!-- footer -->
  <footer class="flex justify-around five-percent pb-12 bg-white">
    <div>
      <h3 class="dark-headline pb-2">PokeTrademon</h3>
      <p class="dark-text">Kongensgade 29, 6700 Esbjerg</p>
      <p class="dark-text">+45 23 27 21 09</p>
      <p class="dark-text">Support@Poketrademon.com</p>
    </div>

    <div class="flex flex-col gap-2 footer-links">
      <RouterLink to="/market"><p class="dark-text">Market</p></RouterLink>
      <RouterLink to="/about"><p class="dark-text">About PokeTrademon</p></RouterLink>
      <RouterLink to="/contact"><p class="dark-text">Contact us</p></RouterLink>
      <p class="dark-text">Careers</p>
    </div>

    <div class="flex flex-col gap-2 footer-links">
      <p class="dark-text">Cookie policy</p>
      <p class="dark-text">Privacy policy</p>
      <p class="dark-text">Cookie settings</p>
      <p class="dark-text">Security</p>
      <p class="dark-text">Copyright PokeTrademon 2025</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UserDropdown from '../src/components/user/UserDropdownView.vue'
import { state } from './modules/globalStates/state'

// check login state
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


/* footer */
.footer-links p {
  transition: 0.3s;
}

.footer-links p:hover {
  color: var(--dark-text);
  text-decoration: underline;
  cursor: pointer;
}

/* responsive design */
@media screen and (max-width: 800px) {
    footer {
      flex-direction: column;
      gap: 24px;
    }
  }
</style>
