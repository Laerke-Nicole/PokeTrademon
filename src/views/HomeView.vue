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
  <section>
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <p class="mx-auto mt-2 max-w-lg text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">What's new at PokeTrademon</p>
        <div class="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          <div class="relative lg:row-span-2">
            <div class="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]" />
            <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Mobile friendly</p>
                <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.</p>
              </div>
              <div class="@container relative min-h-[30rem] w-full grow max-lg:mx-auto max-lg:max-w-sm">
                <div class="absolute inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                  <img class="size-full object-cover object-top" src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-mobile-friendly.png" alt="" />
                </div>
              </div>
            </div>
            <div class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 lg:rounded-l-[2rem]" />
          </div>
          <div class="relative max-lg:row-start-1">
            <div class="absolute inset-px rounded-lg bg-white max-lg:rounded-t-[2rem]" />
            <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div class="px-8 pt-8 sm:px-10 sm:pt-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Performance</p>
                <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit maiores impedit.</p>
              </div>
              <div class="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img class="w-full max-lg:max-w-xs" src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-performance.png" alt="" />
              </div>
            </div>
            <div class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-t-[2rem]" />
          </div>
          <div class="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
            <div class="absolute inset-px rounded-lg bg-white" />
            <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div class="px-8 pt-8 sm:px-10 sm:pt-10">
                <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Security</p>
                <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi.</p>
              </div>
              <div class="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img class="h-[min(152px,40cqw)] object-cover" src="https://tailwindcss.com/plus-assets/img/component-images/bento-03-security.png" alt="" />
              </div>
            </div>
            <div class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5" />
          </div>
          <div class="relative lg:row-span-2">
            <div class="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
            <div class="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div class="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p class="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">Powerful APIs</p>
                <p class="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget sem sodales gravida.</p>
              </div>
              <div class="relative min-h-[30rem] w-full grow">
                <div class="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900 shadow-2xl">
                  <div class="flex bg-gray-800/40 ring-1 ring-white/5">
                    <div class="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div class="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">NotificationSetting.jsx</div>
                      <div class="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                    </div>
                  </div>
                  <div class="px-6 pt-6 pb-14">
                    <!-- Your code example -->
                  </div>
                </div>
              </div>
            </div>
            <div class="pointer-events-none absolute inset-px rounded-lg ring-1 shadow-sm ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]" />
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
</style>