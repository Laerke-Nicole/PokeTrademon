<template>
  <div class="pt-20">
    <!-- filters and search -->
    <div>

    </div>
    

    <!-- card list -->
    <div>
      <div v-if="loading">Loading...</div>
  
      <div v-else-if="error">There is an error.</div>
  
      <!-- loop of cards -->
      <div v-else class="flex flex-wrap -mx-2">
        <div v-for="card in cards" :key="card.id" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
          <div class="p-4 rounded-lg shadow-md">
            <router-link :to="`/cards/${card.id}`">
              <img :src="card.images.large" alt="Pokemon card">
              <div class="flex justify-between mt-4">
                <button class="btn-1">See Pokemon card</button>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>





  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useCards } from '../modules/useCards';

const { loading, error, cards, fetchCards } = useCards();

onMounted(() => {
  fetchCards();
})

</script>

<style lang="scss" scoped>

</style>