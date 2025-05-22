<template>
  <!-- show the news details for the specific news -->
  <section class="dark-bg pt-30">
    <div v-if="news" class="flex flex-col ten-percent">
      <div class="extra-dark-bg three-percent py-10 round-corner">
        <div class="ten-percent flex flex-col">
          <p class="light-text">- {{ news.theme.trim() }}</p>
          <h1 class="pt-2 font-bold light-headline">{{ news.title.trim() }}</h1>
          <h3 class="pb-6 light-text">{{ news.subTitle.trim() }}</h3>
        </div>

        <img :src="news.imageURL" alt="news image" class="news-image round-corner" />

        <div class="ten-percent">
          <p class="text-xs pt-6 light-text">{{ news.date.trim() }}</p>
          <p class="pt-2 light-headline">{{ news.text.trim() }}</p>
        </div>
      </div>
    </div>

    <div v-else>
        <p>Loading details for the news...</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';
import { useNews } from '../modules/useNews';
import type { News } from '../interfaces/news';

const route = useRoute();
const news = ref<News | null>(null);

const { fetchNewsById } = useNews();

// when the html is being rendered, then collect the data
onMounted(async () => {
  const newsId = route.params.id as string;
  const fetched = await fetchNewsById(newsId);
  news.value = Array.isArray(fetched) ? fetched[0] : fetched;
});



// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});
</script>

<style scoped>
.news-image {
  height: 70vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}
</style>