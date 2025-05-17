<template>
    <div>
        <h2>List of news</h2>
        <div v-for="newsItem in news" :key="newsItem._id">
          <div class="grid grid-cols-2 gap-4 light-bg round-corner p-4">
            <div class="flex flex-col gap-2">
              <h4>{{ newsItem.title }}</h4>
              <p>{{ newsItem.subTitle }}</p>
            </div>

            <div>
              <img alt="News Image" :src="newsItem.imageURL" class="shadow-lg news-thumbnail">
            </div>
            
            <!-- open modal -->
            <button @click="openModal(newsItem)" class="btn-1">
              Click to edit news <i class="fas fa-user text-lg cursor-pointer"></i>
            </button>
          </div>

          <!-- News modal component -->
          <NewsModal v-model:isVisible="isNewsVisible" :news-item="selectedNewsItem" @updateNews="updateNewsHandler" @deleteNews="deleteNews" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNews } from '../../modules/useNews';
import type { News } from '../../interfaces/news';
import NewsModal from './modals/NewsModal.vue';


// news fetching
const { news, fetchNews, deleteNews, updateNews } = useNews();

const isNewsVisible = ref(false);
const selectedNewsItem = ref<News | null>(null);



// Open modal with specific news item
const openModal = (newsItem: News) => {
  selectedNewsItem.value = { ...newsItem }; 
  isNewsVisible.value = true;
};

// handling updating news
const updateNewsHandler = async (news: News) => {
  const updatedNews = {
    title: news.title,
    subTitle: news.subTitle,
    text: news.text,
    imageURL: news.imageURL,
    date: news.date,
    theme: news.theme,
    isHidden: news.isHidden,
  }
  await updateNews(news._id, updatedNews)
  isNewsVisible.value = false;
  fetchNews();
}


onMounted(() => {
  fetchNews();
});

</script>

<style scoped>
.news-thumbnail {
  width: auto;
  height: 150px;
  object-fit: cover;
}
</style>