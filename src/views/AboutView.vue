<template>

  <AboutUs />
  <MisionVision />
  <Values />
    
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';

// import components
import AboutUs from '../components/aboutView/AboutUs.vue';
import MisionVision from '../components/aboutView/MissionVision.vue';
import Values from '../components/aboutView/Values.vue';

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});
</script>

<style scoped>

</style>