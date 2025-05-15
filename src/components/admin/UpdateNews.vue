<template>
    <div>
        <<h2>News</h2>
        <div v-for="news in news" :key="news._id">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text"  placeholder="Title" v-model="news.title"/>
            <input type="text"  placeholder="SubTitle" v-model="news.subTitle"/> 

            <div>
            <span>News text: </span>
            <input type="text" placeholder="Text" class=" pl-2 " v-model="news.text"/> 
            </div>

            <div>
            <span>News image: </span>
            <input type="text" v-model="news.imageURL"  placeholder="Image URL" /> 
            <span>
                Thumbnail image: <img alt="News Image" :src="news.imageURL">
            </span>
            </div>

            <div>
            <span>News date: </span>
            <input type="text" placeholder="Date" v-model="news.date"/> 
            </div>

            <div>
            <span>News theme: </span>
            <input type="text" placeholder="Theme" v-model="news.theme"/> 
            </div>

            <div>
            <input type="checkbox"  class="p-2 border rounded w-6 h-6 mr-2" v-model="news.isHidden"/> <span class="uppercase font-bold">Hidden news</span> 
            </div>
            
        </div>

        <!-- delete and update btns -->
        <div class="mt-4 flex space-x-2"> 
            <p>ID:  </p> <!-- News ID for testing -->
            <button @click="deleteNews(news._id)" class="bg-red-600 text-white p-2 rounded hover:bg-red-700">Delete</button> 
            <button @click="updateNewsHandler(news)" class="bg-green-600 text-white p-2 rounded hover:bg-green-700">Edit</button>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { scrollToTop } from '../../modules/scrollToTop/TopRouterView';
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