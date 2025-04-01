<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-else-if="error">There is an error.</div>

    <div v-else>
      <div v-for="card in cards" :key="card._id">
        <router-link :to="`/cards/${card._id}`" class="btn-1">
          <img src="" alt="Pokemon card">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCards } from '../modules/useCards'

// what we need from useCards
const { loading, error, cards, fetchCards } = useCards();

onMounted(() => {
  fetchCards();
})

</script>

<style lang="scss" scoped>

</style>