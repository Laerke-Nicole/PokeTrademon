<template>
  <div>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image, index) in images" :key="index">
          <img :src="image" alt="Slide Image">
          <div class="title"><p>Name</p></div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Pagination } from "swiper/modules";

// Sample images
const images = ref(Array.from({ length: 6 }, () => `https://picsum.photos/500/600?random=${Math.random()}`));

onMounted(() => {
  const swiper = new Swiper(".swiper", {
    modules: [EffectCoverflow, Pagination],
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3, 
    loop: true, 
    speed: 600,
    coverflowEffect: {
      rotate: 0,
      stretch: 60,
      depth: 250, 
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      click(event) {
        if (event.clickedIndex !== undefined) {
          swiper.slideTo(event.clickedIndex);
        }
      },
    },
  });
});
</script>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  padding: 50px 0;
  max-width: 1000px;
  margin: 0 auto;
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
</style>