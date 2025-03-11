<template>
    <div>
        <p>Log in</p>
        <input type="text" class="" placeholder="Email"  v-model="email"/> 
        <input type="password" class="" placeholder="Password"  v-model="password"/>
        <button class="btn-1" @click="fetchToken(email, password)">Login</button>

        <button class="" @click="logout()">Logout</button>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

</style>