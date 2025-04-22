<template>
  <!-- hero section -->
  <section class="dark-bg hero-section">
    <div class="hero-content five-percent grid grid-cols-2">
      <div>
        <h1 class="leading-tight pb-4 dark-headline">Universe of Pokemon card trading</h1>
        <p class="pb-6 dark-text">Discover the ultimate collection of Pokemon trading cards. Explore the vast selection, engage with fellow enthusiasts, and embark on an unforgettable journey into the realm of the beloved pocket monsters</p>
        <RouterLink to="/market"><button class="btn-1">Explore</button></RouterLink>
      </div>

      <div class="pikachu-model-container">
        <!-- pikachu 3D -->
        <PikachuModel />
      </div>
    </div>
  </section>


  <!-- carousel -->
  <section class="py-24">
    <div class="flex flex-col justify-center align-center pb-8">
      <h2 class="text-center dark-headline">Selected trader cards</h2>
      <p class="text-center">A few of the many Pokemon cards you can collect</p>
    </div>

    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image, index) in images" :key="index">
          <img :src="image" alt="Pokemon card">
        </div>
      </div>
      <!-- navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>

    <div class="flex justify-center align-center pt-12">
      <RouterLink to="/market"><button class="btn-1">Explore more</button></RouterLink>
    </div>
  </section>


  <!-- top sellers -->
  <section class="five-percent pb-24 dark-bg pt-18">
    <div class="flex justify-center align-center pb-8">
      <h2 class="dark-headline">Top traders</h2>
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
          <button class="pt-4 underline dark-text text-left">Open trades</button>
        </div>
          
        </div>
      </div>
    </div>
  </section>


  <!-- explore market -->
  <section>
    <div class="light-bg grid grid-cols-2 five-percent gap-12 pt-18 pb-18">
      <!-- Image side -->
      <div class="flex items-center justify-center">
        <img src="/images/pikachu-img.svg" alt="Pikachu Image" class="max-w-full h-auto" />
      </div>

      <!-- Text side -->
      <div class="flex flex-col justify-center space-y-4 px-8">
        <p class="yellow-text">Collect cards today</p>
        <h2 class="dark-headline pb-6">More than 3000 cards to trade</h2>
        <p class="dark-text pb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis voluptatum ab! Sed odit quia doloremque sapiente dicta maxime, accusantium repellat, ullam dolorem mollitia explicabo, dolorum a molestiae laboriosam laudantium.</p>
        <RouterLink to="/market"><button class="btn-1">Start trading</button></RouterLink>
      </div>
    </div>
  </section>



  <!-- news -->
  <section class="five-percent dark-bg pt-18">
    <div class="flex flex-col justify-center align-center pb-8">
      <h2 class="dark-headline text-center">What's new at PokeTrademon</h2>
      <p class="dark-text text-center">Lorem ipsum dolor sit, amet.</p>
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

  <div class="bg-white">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#B9D6E5" fill-opacity="1" d="M0,160L34.3,144C68.6,128,137,96,206,106.7C274.3,117,343,171,411,197.3C480,224,549,224,617,197.3C685.7,171,754,117,823,128C891.4,139,960,213,1029,224C1097.1,235,1166,181,1234,181.3C1302.9,181,1371,235,1406,261.3L1440,288L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// import swiper carousel
import { useSwiper } from '../components/swiperCarousel/SwiperCarousel';
import PikachuModel from '../components/threejs/pikachuModel.vue'

// Initialize Swiper
useSwiper();

// Sample images
const images = ref(Array.from({ length: 6 }, (_, i) => `https://picsum.photos/500/600?random=${i}`));


</script>

<style lang="scss" scoped>
// hero section
.hero-section {
  height: 90vh;
  padding-top: 70px;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.hero-content {
  max-width: 90%;
  display: flex; /* Using flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

// pikachu model
.pikachu-model-container {
  width: 100%;  /* Full width of the div, adjust as needed */
  height: 300px;  /* Set a fixed height or adjust as needed */
  display: flex; /* Use flexbox to align the model */
  justify-content: center; /* Center the Pikachu model horizontally */
  align-items: center;
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