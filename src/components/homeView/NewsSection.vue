<template>
    
  <section class="five-percent dark-bg pt-18">
    <div class="flex flex-col justify-center align-center pb-8" v-motion-fade-slide>
      <h2 class="dark-headline text-center">What's new at PokeTrademon</h2>
      <p class="dark-text text-center">Exciting news at us</p>
    </div>

    <div>
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else-if="error" class="text-center text-red-500">There's an error.</div> 

      <div v-else class="grid grid-cols-3 gap-4" v-motion-fade-slide>
        <div v-for="(newsItem, index) in news.filter(n => !n.isHidden)" :key="newsItem._id" 
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
          <RouterLink :to="`/news/${newsItem._id}`" class="block no-underline">
            <div class="round-corner light-bg hover:shadow-lg transition-shadow duration-300">
              <img :src="newsItem.imageURL" class="round-corner-top w-full h-72 object-cover" />
              <div class="p-4">
                <h4 class="dark-headline text-center">{{ newsItem.title.trim() }}</h4>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNews } from '../../modules/useNews';


// fetch the data from news
const { loading, error, news, fetchNews } = useNews();

onMounted(() => {
  fetchNews();
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
}

@media screen and (max-width: 600px) {
  .column-news {
    flex: 100%;
    max-width: 100%;
  }
}
</style>