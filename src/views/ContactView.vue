<template>
  <section v-if="aboutUs.length && aboutUs[0]" class="pt-38 dark-bg five-percent">
    <div>
      <h1 class="light-headline pb-6">Contact us</h1>
      <p class="light-text">Monday - Friday at {{ aboutUs[0].openingHours.trim() }}</p>
      <p class="pb-6 light-text">Weekends are closed</p>
      <p class="light-text">{{ aboutUs[0].phoneNumber.trim() }}</p>
      <p class="light-text">{{ aboutUs[0].email.trim() }}</p>
    </div>
  </section>

  <div v-else>
    <p>Loading contact information...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { scrollToTop } from '../modules/scrollToTop/TopRouterView'
import { useAboutUs } from '../modules/useAboutUs'

// AboutUs fetching
const { aboutUs, fetchAboutUs } = useAboutUs()

onMounted(() => {
  fetchAboutUs()
})

// start at the top of the page
onMounted(() => {
  scrollToTop()
})
</script>

<style scoped></style>
