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

        <button v-if="isLoggedIn" @click="logout">Log out</button>
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
