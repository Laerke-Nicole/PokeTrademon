<template>
    <div v-if="state.userRole === 'admin'" class="five-percent dark-bg pt-30">
      <div>
        <h1>Admin View</h1>
        <div class="text-center" v-if="loading">Loading...</div>                            
        <div class="text-center text-red-500" v-else-if="error">{{ error }} </div>                        
        <div class="flex flex-wrap -mx-2" v-else> 
          

        <!-- add news -->
        <div>
          <h2>Add News</h2>
          <form @submit.prevent="addNewsHandler">                                                              
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" v-model="newNews.title" placeholder="Title" />
              <input type="text" v-model="newNews.subTitle" placeholder="Sub title" /> 

              <div>
                <span>News text: </span>
                <input type="text" v-model="newNews.text" placeholder="Text" />
              </div>

              <div>
                <span>News image: </span>
                <input type="text" v-model="newNews.imageURL" placeholder="Image URL" />
              </div>

              <div>
                <span>News date: </span>
                <input type="text" v-model="newNews.date" placeholder="Date" />
              </div>

              <div>
                <span>News theme: </span>
                <input type="text" v-model="newNews.theme" placeholder="Theme" />
              </div>

              <div>
                <input type="checkbox" v-model="newNews.isHidden" /> <span class="uppercase font-bold">Hidden News</span> 
              </div>

            </div>
            <button type="submit" class="btn-1">Create news</button>
          </form>
        </div>


        <!-- updating news -->
        <div>
          <h2>News</h2>
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
      </div>
        <!-- Custom confirmation dialog -->

      </div>
    </div>

    <!-- make sure if user isnt admin they cant see the page -->
    <div v-else class="five-percent dark-bg pt-30">
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <button> 
        <RouterLink to="/"><button class="btn-1">Go to Home</button></RouterLink>
      </button>
      
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { scrollToTop } from '../../modules/scrollToTop/TopRouterView';
import { state } from '../../modules/globalStates/state';
import { useNews } from '../../modules/useNews';
import type { News } from '../../interfaces/news';
import { sub } from 'three/tsl';

const router = useRouter();

// redirect to homepage if user is not admin
if (state.userRole !== 'admin') {
  router.push('/auth');
}

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});



// news fetching
const { news, error, loading, fetchNews, deleteNews, addNews, getTokenAndUserId, updateNews } = useNews();

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
  _createdBy: '', 
});


const addNewsHandler = async () => {
  // import userId from the useNews
  const { userId } = getTokenAndUserId();
  // attach to new news
  newNews.value._createdBy = userId;
  await addNews(newNews.value)
  newNews.value = {
    ...newNews.value,
  }
}

const updateNewsHandler = async (news: News) => {
  const updateNews = {
    title: news.title,
    subTitle: news.subTitle,
    text: news.text,
    imageURL: news.imageURL,
    date: news.date,
    theme: news.theme,
    isHidden: news.isHidden,
  }
  await updateNews(news._id, updateNews)
}

</script>

<style scoped>

</style>