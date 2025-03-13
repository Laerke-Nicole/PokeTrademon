<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- navigation -->
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/auth">Log in</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
      <RouterLink to="/"><button @click="logout()">Log out</button></RouterLink>
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
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--secondary-color);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}
</style>
