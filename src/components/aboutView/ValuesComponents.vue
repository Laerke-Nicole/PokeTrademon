<template>
  <!-- show only the first about us data -->
  <section v-if="aboutUs.length && aboutUs[0]" class="five-percent pt-18 dark-bg">
    <div class="flex flex-col justify-center align-center pb-10 ten-percent" v-motion-fade-slide>
      <h2 class="text-center light-headline">Our values</h2>
      <p class="light-text text-center ten-percent">{{ aboutUs[0].valuesSubTitle.trim() }}</p>
    </div>

    <div class="grid grid-cols-3 gap-6 ten-percent values-container" v-motion-fade-slide>
      <div class="white-bg shadow round-corner p-10">
        <p class="number-text text-center blue-text text-6xl pb-4">01</p>
        <h4 class="text-center pb-4 dark-headline">{{ aboutUs[0].valueOneTitle.trim() }}</h4>
        <p class="text-center dark-text">{{ aboutUs[0].valueOne.trim() }}</p>
      </div>

      <div class="white-bg shadow round-corner p-10">
        <p class="number-text text-center blue-text text-6xl pb-4">02</p>
        <h4 class="text-center pb-4 dark-headline">{{ aboutUs[0].valueTwoTitle.trim() }}</h4>
        <p class="text-center dark-text">{{ aboutUs[0].valueTwo.trim() }}</p>
      </div>

      <div class="white-bg shadow round-corner p-10">
        <p class="number-text text-center blue-text text-6xl pb-4">03</p>
        <h4 class="text-center pb-4 dark-headline">{{ aboutUs[0].valueThreeTitle.trim() }}</h4>
        <p class="text-center dark-text">{{ aboutUs[0].valueThree.trim() }}</p>
      </div>
    </div>
  </section>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAboutUs } from '../../modules/useAboutUs'

// AboutUs fetching
const { aboutUs, fetchAboutUs } = useAboutUs()

onMounted(() => {
  fetchAboutUs()
})
</script>

<style scoped>
.number-text {
  font-weight: bold;
}

/* responsive design */
@media screen and (max-width: 800px) {
  .values-container {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
