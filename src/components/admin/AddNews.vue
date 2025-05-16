<template>
    <!-- add news -->
    <div>
        <h2 class="pb-4">Add News</h2>
        <form @submit.prevent="addNewsHandler">                                                              
        <div class="flex flex-col gap-4">

          <div class="flex flex-col gap-2">
              <span>News title: </span>
              <input type="text" v-model="newNews.title" placeholder="Title" class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>News sub title: </span>
              <input type="text" v-model="newNews.subTitle" placeholder="Sub title" class="white-bg round-corner p-1" /> 
            </div>
            
            <div class="flex flex-col gap-2">
              <span>News text: </span>
              <input type="text" v-model="newNews.text" placeholder="Text" class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>News image: </span>
              <input type="text" v-model="newNews.imageURL" placeholder="Image URL" class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>News date: </span>
              <input type="text" v-model="newNews.date" placeholder="Date" class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>News theme: </span>
              <input type="text" v-model="newNews.theme" placeholder="Theme" class="white-bg round-corner p-1" />
            </div>

            <div>
              <input type="checkbox" v-model="newNews.isHidden" /> <span class="uppercase font-bold">Hidden News</span> 
            </div>

        </div>

        <div class="pt-4">
          <button type="submit" class="btn-1">Create news</button>
        </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNews } from '../../modules/useNews';

// news fetching
const { fetchNews, addNews, getTokenAndUserId } = useNews();

onMounted(() => {
  fetchNews();
});


// create new news
const newNews = ref({
  title: '',
  subTitle: '',
  text: '',
  imageURL: '',
  date: '',
  theme: '',
  isHidden: false,
  userId: '',
});


// handling adding new news
const addNewsHandler = async () => {
  // import userId from the useNews
  const { userId } = getTokenAndUserId();
  // attach to new news
  newNews.value.userId = userId;
  await addNews(newNews.value)
  newNews.value = {
    ...newNews.value,
  }
}
</script>

<style scoped>

</style>