<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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
        <RouterLink to="/auth">Log in</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
        <RouterLink to="/"><button @click="logout()">Log out</button></RouterLink>
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
import { useUsers } from '../src/modules/auth/userModels';

// fetch logout function
const { logout } = useUsers();

</script>

<style scoped>
nav {
  width: 100%;
  font-size: 14px;
  text-align: center;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  display: flex;
  justify-content: space-evenly;
  background-color: var(--tertiary-color);
  align-items: center;
  position: fixed;
  z-index: 100;
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

/* footer */

</style>
