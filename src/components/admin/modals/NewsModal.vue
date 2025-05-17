<!-- NewsModal.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div class="bg-white max-w-lg w-full p-6 rounded-lg relative">
      <button @click="$emit('close')" class="absolute top-2 right-2 text-xl font-bold">&times;</button>

      <h2 class="text-xl font-bold mb-4">Edit News</h2>
      <div v-for="news in news" :key="news._id">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <span>News title: </span>
            <input type="text" v-model="news.title" placeholder="Title" class="white-bg round-corner p-1" />
          </div>
            
          <div class="flex flex-col gap-2">
            <span>News sub title: </span>
            <input type="text" v-model="news.subTitle" placeholder="Sub title" class="white-bg round-corner p-1" /> 
          </div>

          <div class="flex flex-col gap-2">
            <span>News text: </span>
            <input type="text" v-model="news.text" placeholder="Text" class="white-bg round-corner p-1" />
          </div>

          <div class="flex flex-col gap-2">
            <span>News image: </span>
            <input type="text" v-model="news.imageURL" placeholder="Image URL" class="white-bg round-corner p-1" />
            <span>Thumbnail image: <img alt="News Image" :src="news.imageURL"></span>
          </div>

          <div class="flex flex-col gap-2">
            <span>News date: </span>
            <input type="text" v-model="news.date" placeholder="Date" class="white-bg round-corner p-1" />
          </div>

          <div class="flex flex-col gap-2">
            <span>News theme: </span>
            <input type="text" v-model="news.theme" placeholder="Theme" class="white-bg round-corner p-1" />
          </div>

          <div>
            <input type="checkbox" v-model="news.isHidden" /> <span class="uppercase font-bold">Hidden News</span> 
          </div>
        </div>

        <!-- delete and update btns -->
        <div class="mt-4 flex space-x-2"> 
            <p>ID: {{ news._id }} </p> 
            <button @click="deleteNews(news._id)" class="bg-red-600 text-white p-2 rounded hover:bg-red-700">Delete</button> 
            <button @click="updateNewsHandler(news)" class="bg-green-600 text-white p-2 rounded hover:bg-green-700">Edit</button>
        </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useNews } from '../../../modules/useNews';
import type { News } from '../../../interfaces/news';


const emit = defineEmits(['close']);

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
.input {
  @apply white-bg round-corner p-2 border border-gray-300 w-full;
}
</style>