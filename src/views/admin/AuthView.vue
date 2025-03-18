<template>
    <div class="pt-24 flex flex-col gap-4 five-percent">
        <h3>Login to your account</h3>
        <input type="text" class="flex light-bg p-2 round-corner dark-text" placeholder="Email"  v-model="email"/> 
        <input type="password" class="flex light-bg p-2 round-corner dark-text" placeholder="Password"  v-model="password"/>
        <button class="btn-1" @click="fetchToken(email, password)">Login</button>
    </div>
</template>

<script setup lang="ts">
// import user model
import { useUsers } from '../../modules/auth/userModels';

// fetch the functions needed for the login page
const { fetchToken, email, password } = useUsers();

</script>

<style lang="scss" scoped>

</style>