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
   <footer>
    
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
</style>
