<template>
  <HeroSection />
  <CardsCarousel />
  <ExploreMarket />
  <AboutPoketrademon />
  <NewsSection />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';

// import components
import HeroSection from '../components/homeView/HeroSection.vue'
import CardsCarousel from '../components/homeView/CardsCarousel.vue'
import ExploreMarket from '../components/homeView/ExploreMarket.vue'
import AboutPoketrademon from '../components/homeView/AboutPoketrademon.vue'
import NewsSection from '../components/homeView/NewsSection.vue'


// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});
</script>

<style lang="scss" scoped>

</style>