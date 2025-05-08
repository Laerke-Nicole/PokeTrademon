<template>
    <section class="dark-bg pt-30">
        <div v-if="news && news.length > 0" class="flex flex-col ten-percent">
            <div class="extra-dark-bg three-percent py-10 round-corner">
                <div class="ten-percent flex flex-col">
                    <p>- {{ news[0].theme }}theme</p>
                    <h1 class="pt-2 font-bold">{{ news[0].title }}title</h1>
                    <h3 class="pb-6">{{ news[0].subTitle }}sub title</h3>
                </div>

                <img :src="news[0].imageURL" alt="news image" class="news-image round-corner" />
                
                <div class="ten-percent">
                    <p class="text-xs pt-6 text-gray-700">{{ news[0].date }}18-05-2020</p>
                    <p class="pt-2">{{ news[0].text }}text</p>
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
.news-image {
    height: 80vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>