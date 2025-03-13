<template>
    <div class="flex flex-col gap-4">
        <h1>Register</h1>
        <input type="text" class="flex light-bg p-2 round-corner dark-text" placeholder="Name"  v-model="username"/> 
        <input type="text" class="flex light-bg p-2 round-corner dark-text" placeholder="Email"  v-model="email"/> 
        <input type="password" class="flex light-bg p-2 round-corner dark-text" placeholder="Password"  v-model="password"/>
        <button class="btn-1" @click="registerUser(username, email, password)">Register</button>
    </div>
</template>

<script setup lang="ts">
import { useUsers } from '../../modules/auth/userModels';

// fetch the functions needed for the register page
const { registerUser, username, email, password } = useUsers();

</script>

<style lang="scss" scoped>

</style>