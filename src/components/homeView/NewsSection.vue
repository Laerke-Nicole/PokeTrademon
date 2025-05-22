<template>
  <section class="five-percent dark-bg pt-18">
    <div class="flex flex-col justify-center align-center pb-8" v-motion-fade-slide>
      <h2 class="light-headline text-center">What's new at PokeTrademon</h2>
      <p class="light-text text-center">Exciting news at us</p>
    </div>

    <div>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="error" class="text-center text-red-500">There's an error.</div>

      <div v-else class="grid grid-cols-3 gap-x-6 news-cards" v-motion-fade-slide>
        <!-- loop with news -->
        <div
          v-for="(newsItem, index) in news.filter((n) => !n.isHidden).slice(0, 6)"
          :key="newsItem._id"
          :class="[
            'w-full card-news',
            // first column in every row gets extra padding
            index % 3 === 0 ? 'pt-12' : '',
            // third column in every row gets extra padding
            index % 3 === 2 ? 'pt-6' : '',
          ]"
        >
          <!-- btn linking to news detail page -->
          <RouterLink :to="`/news/${newsItem._id}`" class="block no-underline">
            <div
              class="round-corner light-bg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img :src="newsItem.imageURL" class="round-corner-top w-full h-72 object-cover" />
              <div class="p-4 flex items-center justify-center h-[6.5rem]">
                <h4 class="dark-headline text-center line-clamp-3">{{ newsItem.title.trim() }}</h4>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <div class="pt-8 flex justify-center">
        <RouterLink to="/news">
          <button class="btn-1">See more news</button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useNews } from '../../modules/useNews'

// fetch the data from news
const { loading, error, news, fetchNews } = useNews()

onMounted(() => {
  fetchNews()
})
</script>

<style scoped>
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

  .news-cards {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 30px;
  }

  .card-news {
    padding-top: 0;
  }
}

@media screen and (max-width: 600px) {
  .column-news {
    flex: 100%;
    max-width: 100%;
  }
}
</style>
