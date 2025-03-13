<template>
  <div>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image, index) in images" :key="index">
          <img :src="image" alt="Slide Image">
          <div class="title"><p>Name</p></div>
        </div>
      </div>
      <!-- navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import swiper carousel
import { useSwiper } from '../components/swiperCarousel/SwiperCarousel';

// Initialize Swiper
useSwiper();

// Sample images
const images = ref(Array.from({ length: 6 }, (_, i) => `https://picsum.photos/500/600?random=${i}`));

</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  padding: 50px 0;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.swiper-wrapper {
  display: flex;
}

.swiper-slide {
  position: relative;
  width: 180px;
  aspect-ratio: 3/4;
  border-radius: 3px;
  transition: transform 0.3s ease;
}

.swiper-slide-active {
  transform: scale(1.5);
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
  user-select: none;
}

.title {
  position: absolute;
  bottom: 5px;
  left: 50%;
  color: var(--light-headline);
  transform: translate(-50%, 20%);
  text-align: center;
  padding: 10px 18px;
  transition: 0.3s linear;
}

.swiper-button-prev, .swiper-button-next {
  z-index: 10;
  color: var(--light-text);
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}


</style>