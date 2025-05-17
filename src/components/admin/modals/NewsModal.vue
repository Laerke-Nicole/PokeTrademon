<template>
    <div>
        <div v-if="isVisible" @click.self="toggleNews" class="pt-30 pb-10 modal-exit fixed inset-0 flex items-center justify-center">
            <div @click.stop class="modal light-bg h-full p-4 overflow-y-auto" > 
            <div>
                <!-- top section with title and close btn -->
                <div class="flex justify-between items-center pb-6">
                    <div>
                        <h2 class="">Edit News</h2>
                    </div>

                    <!-- cloe X btn -->
                    <div class="flex justify-end items-end">
                        <button @click="toggleNews" class="text-4xl text-red-400 hover:text-red-700">&times;</button>
                    </div>
    
                </div>
                
                <!-- list of the news info -->
                <div v-if="newsItem">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-2">
                        <span>News title: </span>
                        <input type="text" v-model="newsItem.title" placeholder="Title" class="white-bg round-corner p-1" />
                        </div>
                        
                        <div class="flex flex-col gap-2">
                        <span>News sub title: </span>
                        <input type="text" v-model="newsItem.subTitle" placeholder="Sub title" class="white-bg round-corner p-1" /> 
                        </div>
            
                        <div class="flex flex-col gap-2">
                        <span>News text: </span>
                        <input type="text" v-model="newsItem.text" placeholder="Text" class="white-bg round-corner p-1" />
                        </div>
            
                        <div class="flex flex-col gap-2">
                        <span>News image: </span>
                        <input type="text" v-model="newsItem.imageURL" placeholder="Image URL" class="white-bg round-corner p-1" />
                        <span>Thumbnail image: <img alt="News Image" :src="newsItem.imageURL" class="news-thumbnail"></span>
                        </div>
            
                        <div class="flex flex-col gap-2">
                        <span>News date: </span>
                        <input type="text" v-model="newsItem.date" placeholder="Date" class="white-bg round-corner p-1" />
                        </div>
            
                        <div class="flex flex-col gap-2">
                        <span>News theme: </span>
                        <input type="text" v-model="newsItem.theme" placeholder="Theme" class="white-bg round-corner p-1" />
                        </div>
            
                        <div>
                        <input type="checkbox" v-model="newsItem.isHidden" /> <span class="uppercase font-bold">Hidden News</span> 
                        </div>
                    </div>
          
                    <!-- delete and update btns -->
                    <div class="pt-6 flex flex-col gap-2"> 
                        <p>ID: {{ newsItem._id }} </p> 
                        <button @click="updateNewsHandler(newsItem)" class="bg-green-600 light-headline p-2 round-corner hover:bg-green-700 cursor-pointer">Edit</button>
                        <button @click="deleteNews(newsItem._id)" class="bg-red-600 light-headline p-2 round-corner hover:bg-red-700 cursor-pointer">Delete</button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useNews } from '../../../modules/useNews';
import type { News } from '../../../interfaces/news';


// Props
const props = defineProps<{ newsItem: News | null }>()
const newsItem = ref<News | null>(null)

watch(
  () => props.newsItem,
  (newVal) => {
    newsItem.value = newVal ? { ...newVal } : null
  },
  { immediate: true }
)

// toggle cart visibility
const isVisible = defineModel<boolean>('isVisible')

// close modal
const toggleNews = ():void => {
  isVisible.value = !isVisible.value
}

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
/* add background behind the modal */
.modal-exit {
  background-color: rgba(91, 91, 91, 0.5);
}

.modal {
    width: 70%;
}

/* news info */
.news-thumbnail {
  width: auto;
  height: 150px;
  object-fit: cover;
}
</style>