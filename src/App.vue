<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useUsers } from './modules/auth/userModels';
import { state } from './modules/globalStates/state';

export default defineComponent({
  setup() {
    const { logout } = useUsers();
    const isLoggedIn = computed(() => state.isLoggedIn);

    return {
      logout,
      isLoggedIn
    };
  }
});
</script>


<template>
  <!-- navigation -->
  <header>
    <nav>
      <div>
        <RouterLink to="/market">Market</RouterLink>
      </div>

      <div>
        <RouterLink to="/"><img src="../public/images/pokemon-logo.png" alt="pokemon logo" class="logo"></RouterLink>
      </div>

      <div>
        <RouterLink to="/profile">Profile</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/auth">Log in</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/register">Register</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/admin">Admin</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/trades">Trades</RouterLink>

        <button v-if="isLoggedIn" @click="logout">Log out</button>
      </div> 
    </nav>
  </header>


  <RouterView />


  <!-- footer -->
  <footer class="flex justify-around five-percent pb-12 bg-white">
    <div>
      <h3 class="dark-headline pb-2">PokeTrademon</h3>
      <p class="dark-text">Kongensgade 29, 6700 Esbjerg</p>
      <p class="dark-text">+45 23 27 21 09</p>
      <p class="dark-text">Support@Poketrademon.com</p>
    </div>

    <div>
      <RouterLink to="/market"><p class="dark-text">Market</p></RouterLink>
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
</style>
