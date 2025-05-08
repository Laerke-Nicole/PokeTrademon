<template>
    <section class="dark-bg pt-30">
        <div v-if="news && news.length > 0" class="flex flex-wrap">
            <div class="w-1/2 p-4">
                <img :src="news[0].imageURL" alt="news image" class="w-full rounded-lg object-cover h-full" />
            </div>
            <div class="w-1/2 p-4">
                <h2 class="text-slate-200 text-2xl font-bold mb-4">{{ news[0].title }}</h2>
                <p class="mb-4">{{ news[0].subTitle }}</p>
                <p class="text-green-500 font-bold">{{ news[0].text }}</p>
                <p class="text-green-500 font-bold">{{ news[0].date }}</p>
                <p class="text-green-500 font-bold">{{ news[0].theme }}</p>
                <p class="text-green-500 font-bold">{{ news[0].author }}</p>
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
import { useNews } from '../modules/useNews';
import type { News } from '../interfaces/news';

const route = useRoute();
const news = ref<News[] | null>(null);

const { fetchNewsById } = useNews();

// when the html is being rendered, then collect the data
onMounted(async() => {
    const newsId = route.params.id as string;
    const fetchNews = await fetchNewsById(newsId);
    console.log("Fetched news", fetchNews);
    news.value = fetchNews;
    console.log("News: ", news.value);
})
</script>

<style scoped>

</style>