<template>
  <section class="dark-bg">
    <article
      class="news-hero-container five-percent pt-12 grid grid-cols-3 justify-center align-center extra-dark-bg"
    >
      <div v-motion-fade-slide>
        <img
          src="../../public/images/cards-left.png"
          alt="pokemon cards"
          class="w-10/12 pokemon-cards-img"
        />
      </div>

      <div class="flex flex-col justify-center items-center" v-motion-fade-slide>
        <h1 class="light-headline text-center">PokeTrademon<br />card news</h1>
      </div>

      <div v-motion-fade-slide>
        <img
          src="../../public/images/cards-right.png"
          alt="pokemon cards"
          class="w-10/12 pokemon-cards-img-two"
        />
      </div>
    </article>

    <article>
      <div v-if="loading" class="text-center">Loading news...</div>
      <div v-else-if="error" class="text-center text-red-500">There's an error.</div>

      <div
        v-else
        class="grid grid-cols-3 gap-6 five-percent pt-14 card-container"
        v-motion-fade-slide
      >
        <!-- loop of news -->
        <div v-for="newsItem in visibleNews" :key="newsItem._id">
          <!-- btn linking to news detail page  -->
          <RouterLink :to="`/news/${newsItem._id}`" class="block no-underline">
            <div
              class="news-card round-corner light-bg shadow hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
            >
              <img :src="newsItem.imageURL" class="round-corner-top w-full h-60 object-cover" />
              <div class="p-4 flex items-center justify-center h-[6.5rem]">
                <h4 class="dark-headline text-center line-clamp-3">{{ newsItem.title.trim() }}</h4>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- load more btn -->
      <div class="pt-8 flex justify-center">
        <button
          class="btn-1"
          @click="loadMore"
          v-if="visibleNews.length < news.filter((n) => !n.isHidden).length"
        >
          Load more news
        </button>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useNews } from '../modules/useNews'
import { scrollToTop } from '../modules/scrollToTop/TopRouterView'

// fetch the data from news
const { loading, error, news, fetchNews } = useNews()
const visibleCount = ref(6)

onMounted(() => {
  fetchNews()
  scrollToTop()
})

// filtered and limited news items to show
const visibleNews = computed(() => {
  return news.value.filter((n) => !n.isHidden).slice(0, visibleCount.value)
})

// load 6 more news when clicking the button
const loadMore = () => {
  visibleCount.value += 6
}
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

.news-card {
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.news-card h4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 3.5rem;
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

  .news-hero-container {
    flex-direction: column;
    padding-top: 130px;
  }

  .pokemon-cards-img {
    display: none;
  }

  .pokemon-cards-img-two {
    height: 400px;
    width: auto;
    object-fit: contain;
  }

  .card-container {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

@media screen and (max-width: 600px) {
  .column-news {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
