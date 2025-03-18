<template>
  <!-- hero section -->
  <section class="hero-section">
    <div class="hero-content five-percent">
      <h1 class="leading-tight pb-4 dark-headline">Universe of Pokemon card trading</h1>
      <p class="pb-6 dark-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sequi necessitatibus recusandae aperiam provident culpa nam magni fugit unde dolorem, nemo, corporis eligendi.</p>
      <button class="btn-2">GET STARTED</button>
    </div>
  </section>


  <!-- carousel -->
  <section class="py-24">
    <div class="flex justify-center align-center pb-8">
      <h2>Selected trader cards</h2>
    </div>

    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image, index) in images" :key="index">
          <img :src="image" alt="Pokemon card">
          <div class="title">
            <p>Name</p>
          </div>
        </div>
      </div>
      <!-- navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>

    <div class="flex justify-center align-center pt-12">
      <button class="btn-1">EXPLORE MORE</button>
    </div>
  </section>


  <!-- top sellers -->
  <section class="five-percent pb-24">
    <div class="flex justify-center align-center pb-8">
      <h2>Top traders</h2>
    </div>

    <div class="grid grid-cols-4 gap-4">
      <div v-for="(image, index) in images" :key="index">
      <div class="flex gap-6 light-bg p-4 round-corner">
        <div>
          <img src="https://picsum.photos/100/100?random=${i}" alt="Traders profile picture" class="round-corner">
        </div>
        <div>
          <h5 class="font-bold dark-headline">Jane Doe</h5>
          <p class="dark-text">198 Trades</p>
          <button class="pt-4 underline dark-text text-left">OPEN TRADES</button>
        </div>
          
        </div>
      </div>
    </div>
  </section>


  <!-- news -->
  <section class="pb-24 five-percent">
    <div class="flex justify-center align-center pb-8">
      <h2>What's new at PokeTrademon</h2>
    </div>

    <div>
      <div class="row-news">
        <div class="column-news pt-12">
          <div class="round-corner light-bg">
            <img src="https://picsum.photos/600/300?random=1" class="round-corner-top">
            <div class="p-4">
              <h4 class="dark-headline">Five cards to watch out for</h4>
              <p class="dark-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat ab eveniet </p>
            </div>
          </div>

          <div class="round-corner light-bg">
            <img src="https://picsum.photos/600/300?random=1" class="round-corner-top">
            <div class="p-4">
              <h4 class="dark-headline">Five cards to watch out for</h4>
              <p class="dark-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto omnis voluptatem fugit eum deleniti inventore, corrupti nemo, quis libero </p>
            </div>
          </div>
        </div>

        <div class="column-news">
          <div class="round-corner light-bg">
            <img src="https://picsum.photos/600/300?random=1" class="round-corner-top">
            <div class="p-4">
              <h4 class="dark-headline">Five cards to watch out for</h4>
              <p class="dark-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat ab eveniet </p>
            </div>
          </div>

          <div class="round-corner light-bg">
            <img src="https://picsum.photos/600/300?random=1" class="round-corner-top">
            <div class="p-4">
              <h4 class="dark-headline">Challenge players from around the globe in ranked battles season 28</h4>
              <p class="dark-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum nam quos voluptatibus excepturi ad debitis sit vitae adipisci, repellendus neque, omnis unde odio ratione. </p>
            </div>
          </div>
        </div>

        <div class="column-news pt-6">
          <div class="round-corner light-bg">
            <img src="https://picsum.photos/600/300?random=1" class="round-corner-top">
            <div class="p-4">
              <h4 class="dark-headline">Comeplete Pokemon home pokedexes to earn a new pair of shiny pokemon</h4>
              <p class="dark-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum nam quos voluptatibus excepturi ad debitis sit vitae adipisci, repellendus neque, omnis unde odio ratione. </p>
            </div>
          </div>

          <div class="round-corner light-bg">
            <img src="https://picsum.photos/600/300?random=1" class="round-corner-top">
            <div class="p-4">
              <h4 class="dark-headline">Five cards to watch out for</h4>
              <p class="dark-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat ab eveniet </p>
            </div>
          </div>
      </div>
    </div>
  </div>
    
    
  </section>
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
// hero section
.hero-section {
  background: url('../../public/images/hero-img.jpg');
  width: 100%;
  height: 95vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.hero-content {
  max-width: 60%;
}

// swiper
.swiper {
  width: 100%;
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
  bottom: 10px;
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


// news
.row-news {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}

/* Create four equal columns that sits next to each other */
.column-news {
  flex: 33%;
  max-width: 33%;
  padding-right: 8px;
  padding-left: 8px;
}

.column-news img {
  margin-top: 16px;
  vertical-align: middle;
  width: 100%;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column-news {
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column-news {
    flex: 100%;
    max-width: 100%;
  }
}
</style>