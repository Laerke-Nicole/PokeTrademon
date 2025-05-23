<template>
  <div>
    <h2 class="pb-4 light-headline">List of news</h2>
    <div v-for="newsItem in news" :key="newsItem._id" class="flex flex-col gap-4 news-list">
      <div class="grid grid-cols-2 gap-4 light-bg round-corner shadow-lg p-4 news-list">
        <div class="flex flex-col gap-2">
          <h4>{{ newsItem.title.trim() }}</h4>
          <p>{{ newsItem.subTitle.trim() }}</p>
        </div>

        <div class="pb-4">
          <img alt="News Image" :src="newsItem.imageURL" class="shadow-lg news-thumbnail" />
        </div>

        <!-- open modal -->
        <button @click="openModal(newsItem)" class="btn-1">Click to edit news</button>

        <!-- delete news -->
        <button
          @click="deleteNews(newsItem._id)"
          class="delete-btn bg-red-600 light-headline p-2 hover:bg-red-700 cursor-pointer"
        >
          Delete
        </button>

        <!-- display success message -->
        <div v-if="message" class="text-green-600 pt-4 pb-4">
          {{ message }}
        </div>
      </div>
    </div>

    <!-- NewsModal component -->
    <NewsModal
      v-model:isVisible="isNewsVisible"
      :newsItem="selectedNewsItem"
      @updateNews="updateNewsHandler"
      @deleteNews="deleteNews"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNews } from '../../../modules/useNews'
import type { News } from '../../../interfaces/news'
import NewsModal from '../modals/NewsModal.vue'

// news fetching
const { news, fetchNews, deleteNews, updateNews } = useNews()

// for modal to show
const isNewsVisible = ref(false)
const selectedNewsItem = ref<News | null>(null)

// Open modal with specific news item
const openModal = (newsItem: News) => {
  selectedNewsItem.value = { ...newsItem }
  isNewsVisible.value = true
}

// message to show after updating
const message = ref('')

// handling updating news
const updateNewsHandler = async (news: News) => {
  try {
    // take the data from the input fields
    const updatedNews = {
      title: news.title,
      subTitle: news.subTitle,
      text: news.text,
      imageURL: news.imageURL,
      date: news.date,
      theme: news.theme,
      isHidden: news.isHidden,
    }
    // call the updateNews function from useNews
    await updateNews(news._id, updatedNews)
    message.value = 'News updated successfully'
    isNewsVisible.value = false
    fetchNews()

    // remove message after 5 seconds
    setTimeout(() => {
      message.value = ''
    }, 5000)
  } catch {
    throw new Error('Error updating news')
  }
}

onMounted(() => {
  fetchNews()
})
</script>

<style scoped>
.news-list {
  margin-bottom: 10px;
}

.news-thumbnail {
  width: auto;
  height: 150px;
  object-fit: cover;
}

.delete-btn {
  border-radius: 20px;
}

/* responsive design */
@media screen and (max-width: 800px) {
  .news-list {
    margin-bottom: 10px;
  }
}
</style>
