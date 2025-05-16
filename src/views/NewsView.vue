<template>
  <section class="dark-bg">
    <article class="news-hero-container five-percent pt-8 grid grid-cols-3 justify-center align-center extra-dark-bg">
        <div v-motion-fade-slide>
            <img src="../../public/images/cards-left.png" alt="pokemon cards" class="w-10/12"/>
        </div>

        <div class="flex flex-col justify-center items-center" v-motion-fade-slide>
            <h1 class="dark-headline text-center">PokeTrademon<br/>card news</h1>
        </div>

        <div v-motion-fade-slide>
            <img src="../../public/images/cards-right.png" alt="pokemon cards" class="w-10/12">
        </div>
    </article>


    <article>
      <div v-if="loading" class="text-center">Loading news...</div>
      <div v-else-if="error" class="text-center text-red-500">There's an error.</div> 

      <div v-else class="grid grid-cols-3 gap-4" v-motion-fade-slide>
        <div v-for="newsItem in news" :key="newsItem._id">
          <!-- btn linking to news detail page  -->
          <RouterLink :to="`/news/${newsItem._id}`" class="block no-underline">
            <div class="round-corner light-bg hover:shadow-lg transition-shadow duration-300">
              <img :src="newsItem.imageURL" class="round-corner-top w-full object-cover" />
              <div class="p-4">
                <h4 class="dark-headline">{{ newsItem.title.trim() }}</h4>
                <p class="dark-text">{{ newsItem.subTitle.trim() }}</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNews } from '../modules/useNews';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';


// fetch the data from news
const { loading, error, news, fetchNews } = useNews();

onMounted(() => {
  fetchNews();
})

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});
</script>

<style scoped>
/* hero */
.news-hero-container {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row;
  z-index: 0;
  overflow: hidden; 
  background-color: var(--primary-color-dark);  
}

.news-hero-container::after {
  content: '';
  position: absolute;
  bottom: -50px; 
  left: 0;
  width: 100%;
  height: 100px;
  background-color: var(--primary-color);
  border-radius: 50% 50% 0 0 / 50% 50% 0 0;
  z-index: -1;
}


/* column of news */
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


/* responsive design */
@media screen and (max-width: 800px) {
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