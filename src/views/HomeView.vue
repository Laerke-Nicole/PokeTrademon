<template>
  <HeroSection />
  <CardsCarousel />
  <ExploreMarket />
  <AboutPoketrademon />
  <NewsSection />
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';
// import swiper carousel
import { watch } from 'vue';
import { nextTick } from 'vue';
import { useSwiper } from '../components/swiperCarousel/SwiperCarousel';
import { useCards } from '../modules/useCards'
import { useNews } from '../modules/useNews'

// import components
import HeroSection from '../components/homeView/HeroSection.vue'
import CardsCarousel from '../components/homeView/CardsCarousel.vue'
import ExploreMarket from '../components/homeView/ExploreMarket.vue'
import AboutPoketrademon from '../components/homeView/AboutPoketrademon.vue'
import NewsSection from '../components/homeView/NewsSection.vue'


// cards fetching
const { loading, error, cards, fetchCards } = useCards();

onMounted(() => {
  fetchCards();
})

// only display 15 random cards
const limitedCards = computed(() => {
  return cards.value || [];
});


// fetch the data from news
const { news, fetchNews } = useNews();

onMounted(() => {
  fetchNews();
})


// initialize Swiper after its loaded
watch(loading, async (isLoading) => {
  if (!isLoading) {
    await nextTick(); 
    // initialize Swiper
    useSwiper();
  }
});

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});
</script>

<style lang="scss" scoped>

</style>