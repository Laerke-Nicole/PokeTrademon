<template>
    <div>
        <h2>List of news</h2>
        <div v-for="news in news" :key="news._id">
          <div class="grid grid-cols-2 gap-4 dark-bg">
            <div class="flex flex-col gap-2">
              <span>News title: </span>
              <input type="text" v-model="news.title" placeholder="Title" class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>News image: <img alt="News Image" :src="news.imageURL"></span>
            </div>
          </div>

          <!-- open modal -->
          <div class="mt-4"> 
            <button class="btn-1">Edit news</button>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNews } from '../../modules/useNews';
import type { News } from '../../interfaces/news';

// news fetching
const { news, fetchNews, deleteNews, updateNews } = useNews();

onMounted(() => {
  fetchNews();
});

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
}
</script>

<style scoped>

</style>