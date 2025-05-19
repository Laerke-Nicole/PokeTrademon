<template>
    <!-- add news -->
    <div>
        <h2 class="pb-4">Add News</h2>
        <form @submit.prevent="addNewsHandler">                                                              
        <div class="flex flex-col gap-4">

          <div class="flex flex-col gap-2">
              <span>News title: </span>
              <input type="text" v-model="newNews.title" placeholder="Title" minlength="2" maxlength="100" required class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>News sub title: </span>
              <input type="text" v-model="newNews.subTitle" placeholder="Sub title" minlength="2" maxlength="255" required class="white-bg round-corner p-1" /> 
            </div>
            
            <div class="flex flex-col gap-2">
              <span>News text: </span>
              <textarea type="text" v-model="newNews.text" placeholder="Text" minlength="6" required class="white-bg round-corner p-1"></textarea>
            </div>

            <div class="flex flex-col gap-2">
              <span>News image: </span>
              <input type="text" v-model="newNews.imageURL" placeholder="Image URL" required class="white-bg round-corner p-1" />
            </div>

            <div class="flex flex-col gap-2">
              <span>News date: </span>
              <input type="text" v-model="newNews.date" placeholder="Date" minlength="8" maxlength="10" required class="white-bg round-corner p-1"/>
            </div>

            <div class="flex flex-col gap-2">
              <span>News theme: </span>
              <input type="text" v-model="newNews.theme" placeholder="Theme" minlength="2" maxlength="100" required class="white-bg round-corner p-1" />
            </div>

            <div>
              <input type="checkbox" v-model="newNews.isHidden" /> <span class="uppercase font-bold">Hidden News</span> 
            </div>

        </div>

        <div class="pt-4">
          <div v-if="message" class="text-green-600 pb-4">
            {{ message }}
          </div>
          <button type="submit" class="btn-1">Create news</button>
        </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useNews } from '../../../modules/useNews';



// news fetching
const { news, fetchNews, addNews, getTokenAndUserId } = useNews();

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

const message = ref('');

// handling adding new news
const addNewsHandler = async () => {
  // import userId from the useNews
  const { userId } = getTokenAndUserId();

  // attach to new news
  newNews.value.userId = userId;
  try {
    await addNews(newNews.value)
    message.value = 'News added successfully';
  
    // reset the form
    newNews.value = {
      title: '',
      subTitle: '',
      text: '',
      imageURL: '',
      date: '',
      theme: '',
      isHidden: false,
      userId: '',
    }

    // remove message after 5 seconds
    setTimeout(() => {
      message.value = '';
    }, 5000);
  } 
  catch (error) {
    throw new Error('Error adding news');
  }
}
</script>

<style scoped>

</style>