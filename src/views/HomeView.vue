  <template>
    <!-- hero section -->
    <section class="hero-section">
      <div class="hero-content five-percent grid grid-cols-3">
        <!-- left side with headline -->
        <div class="w-1/3 hero-title">
          <h1 class="leading-tight pb-10 dark-headline" v-motion-fade-slide>Universe of Pokemon card trading</h1>
          
          <div class="flex gap-4">
            <RouterLink to="/market"><button class="btn-1" v-motion-fade-slide>Explore</button></RouterLink>
            <RouterLink to="/profile"><button class="btn-3" v-motion-fade-slide>Your collection</button></RouterLink>  
          </div>
        </div>

        <!-- pikachu model -->
        <div class="pikachu-model-container w-1/3">
          <!-- pikachu 3D -->
          <PikachuModel />
        </div>

        <!-- right side with welcome text -->
        <div class="w-1/3 hero-text">
          <p class="dark-text" v-motion-fade-slide>Discover the ultimate collection of Pokemon trading cards. Explore the vast selection, engage with fellow enthusiasts, and embark on an unforgettable journey into the realm of the beloved pocket monsters.</p>
        </div>
      </div>
    </section>


    <!-- carousel -->
    <section class="py-18">
      <div class="flex flex-col justify-center align-center pb-8" v-motion-fade-slide>
        <h2 class="text-center dark-headline">Selected trader cards</h2>
        <p class="text-center dark-text">A few of the many Pokemon cards you can collect</p>
      </div>

      <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500">There's an error.</div> 

        <div v-else v-motion-fade-slide>
          <div class="swiper" v-motion-fade-slide>
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="card in cards" :key="card.id">
                <img :src="card.images.small || card.images.large" alt="Pokemon card" />
              </div>
            </div>

            <!-- arrows to scroll -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>

        </div>

      <div class="flex justify-center align-center pt-12">
        <RouterLink to="/market"><button class="btn-1" v-motion-fade-slide>Explore more</button></RouterLink>
      </div>
    </section>


    <!-- top sellers -->
    <section class="top-traders-banner py-18 overflow-hidden">
      <div class="flex justify-center align-center pb-8">
        <h2 class="dark-headline" v-motion-fade-slide>Top traders</h2>
      </div>
      
      <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500">There's an error.</div> 

        <div v-else>
          <div class="animate-scroll whitespace-nowrap flex items-center gap-6">
            <!-- <div
              v-for="user in users"
              :key="user"
              class="trader-card flex items-center gap-4 white-bg p-4 round-corner min-w-[250px] shadow-lg"
              v-motion-fade-slide
            >
              <img :src="user.imageURL" alt="Trader" class="round-corner w-16 h-16" />
              <div>
                <h5 class="font-bold dark-headline">Jane Doe</h5>
                <p class="dark-text">198 Trades</p>
                <button class="pt-2 underline dark-text text-left">Open trades</button>
              </div>
            </div> -->
          </div>
        </div>
    </section>


    <!-- explore market -->
    <section>
      <div class="explore-container light-bg grid grid-cols-2 five-percent gap-12 py-18">
        <!-- Image side -->
        <div class="flex items-center justify-center">
          <img src="/images/pikachu-img.svg" alt="Pikachu Image" class="max-w-full h-auto" />
        </div>

        <!-- Text side -->
        <div class="flex flex-col justify-center space-y-4 px-8">
          <p class="yellow-text" v-motion-fade-slide>Collect cards today</p>
          <h2 class="dark-headline pb-6" v-motion-fade-slide>More than 3000 cards to trade</h2>
          <p class="dark-text pb-10" v-motion-fade-slide>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis voluptatum ab! Sed odit quia doloremque sapiente dicta maxime, accusantium repellat, ullam dolorem mollitia explicabo, dolorum a molestiae laboriosam laudantium.</p>
          <RouterLink to="/market"><button class="btn-1" v-motion-fade-slide>Start trading</button></RouterLink>
        </div>
      </div>
    </section>


    <!-- news -->
    <section class="five-percent dark-bg pt-18">
      <div class="flex flex-col justify-center align-center pb-8" v-motion-fade-slide>
        <h2 class="dark-headline text-center">What's new at PokeTrademon</h2>
        <p class="dark-text text-center">Exciting news at us</p>
      </div>

      <div>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else-if="error" class="text-center text-red-500">There's an error.</div> 

        <div v-else class="grid grid-cols-3 gap-4" v-motion-fade-slide>
          <div v-for="(news, index) in news" :key="news._id" 
            :class="[
              'w-full',
              // left column with extra padding top ONLY on the first row
              // 3 is for 3 columns and 0 is for the first column
              index < 3 && index % 3 === 0 ? 'pt-12' : '',
              
              // right column with extra padding top
              // 3 is for 3 columns and 2 is for the last column aka the third column
              index < 3 && index % 3 === 2 ? 'pt-6' : ''
            ]">
            <!-- btn linking to news detail page -->
            <RouterLink :to="`/news/${news._id}`" class="block no-underline">
              <div class="round-corner light-bg hover:shadow-lg transition-shadow duration-300">
                <img :src="news.imageURL" class="round-corner-top w-full object-cover" />
                <div class="p-4">
                  <h4 class="dark-headline">{{ news.title }}</h4>
                  <p class="dark-text">{{ news.subTitle }}</p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { scrollToTop } from '../modules/scrollToTop/TopRouterView';
  // import swiper carousel
  import { watch } from 'vue';
  import { nextTick } from 'vue';
  import { useSwiper } from '../components/swiperCarousel/SwiperCarousel';
  import PikachuModel from '../components/threejs/PikachuModel.vue'
  import { useCards } from '../modules/useCards'
  import { useNews } from '../modules/useNews'
  // import { useUsers } from '../modules/useUsers'

  // cards fetching
  const { loading, error, cards, fetchCards } = useCards();

  onMounted(() => {
    fetchCards();
  })


  // fetch the data from news
  const { news, fetchNews } = useNews();

  onMounted(() => {
    fetchNews();
  })


  // // fetch the data from user
  // const { users, fetchUsers } = useUsers();

  // onMounted(() => {
  //   fetchUsers();
  // })

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
  // hero section
  .hero-section {
    position: relative;
    height: 97vh;
    padding-top: 70px;
    display: flex;
    align-items: center;
    flex-direction: row;
    z-index: 0;
    overflow: hidden; 
    background-color: var(--primary-color-dark);
  }

  .hero-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--primary-color);
    clip-path: polygon(65% 0, 100% 0%, 100% 100%, 35% 100%);
    z-index: -1; 
  }

  .hero-section::after {
    content: '';
    position: absolute;
    bottom: -50px; 
    left: 0;
    width: 100%;
    height: 100px;
    background-color: var(--secondary-color);
    border-radius: 50% 50% 0 0 / 50% 50% 0 0;
    z-index: -1;
  }

  .hero-content {
    display: flex; 
    justify-content: center; 
    align-items: center;
  }

  // pikachu model
  .model-container {
    width: 100%;
    height: 400px;
    min-height: 400px;
  }

  .pikachu-model-container {
    height: 400px;
    position: relative;
    width: 30%;
    cursor: pointer;
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
    border-radius: 10px;
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


  // top traders
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .animate-scroll {
    animation: scroll 30s linear infinite;
  }


  // news
  .row-news {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }

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


  // responsive
  @media screen and (max-width: 800px) {
    .hero-content {
      grid-template-columns: repeat(1, minmax(0, 1fr));
      flex-direction: column;
    }

    .hero-content div {
      width: 100%;
    }

    .pikachu-model-container {
      display: none;
    }

    .hero-title h1 {
      padding-bottom: 20px;
    }

    .hero-text {
      padding-top: 40px;
    }

    .explore-container {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }

    .column-news {
      flex: 50%;
      max-width: 50%;
    }
  }

  @media screen and (max-width: 600px) {
    .column-news {
      flex: 100%;
      max-width: 100%;
    }
  }
  </style>