<template>
  <div>
    <!-- show the modal -->
    <div
      v-if="isVisible"
      @click.self="toggleNews"
      class="pt-30 pb-10 modal-exit fixed inset-0 flex items-center justify-center"
    >
      <div @click.stop class="modal light-bg h-full p-4 overflow-y-auto">
        <div>
          <!-- top section with title and close btn -->
          <div class="flex justify-between items-center pb-6">
            <h2>Edit News</h2>
            <button @click="toggleNews" class="text-4xl text-red-400 hover:text-red-700">
              &times;
            </button>
          </div>

          <!-- list of the news info -->
          <div v-if="editableNews">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <span>News title: </span>
                <input
                  type="text"
                  v-model="editableNews.title"
                  placeholder="Title"
                  minlength="2"
                  maxlength="100"
                  required
                  class="white-bg round-corner p-1"
                />
              </div>

              <div class="flex flex-col gap-2">
                <span>News sub title: </span>
                <input
                  type="text"
                  v-model="editableNews.subTitle"
                  placeholder="Sub title"
                  minlength="2"
                  maxlength="255"
                  required
                  class="white-bg round-corner p-1"
                />
              </div>

              <div class="flex flex-col gap-2">
                <span>News text: </span>
                <textarea
                  v-model="editableNews.text"
                  placeholder="Text"
                  minlength="6"
                  required
                  class="white-bg round-corner p-1"
                ></textarea>
              </div>

              <div class="flex flex-col gap-2">
                <span>News image: </span>
                <input
                  type="text"
                  v-model="editableNews.imageURL"
                  placeholder="Image URL"
                  required
                  class="white-bg round-corner p-1"
                />
                <span>
                  Thumbnail image:
                  <img alt="News Image" :src="editableNews.imageURL" class="news-thumbnail" />
                </span>
              </div>

              <div class="flex flex-col gap-2">
                <span>News date: </span>
                <input
                  type="text"
                  v-model="editableNews.date"
                  placeholder="Date"
                  minlength="8"
                  maxlength="10"
                  required
                  class="white-bg round-corner p-1"
                />
              </div>

              <div class="flex flex-col gap-2">
                <span>News theme: </span>
                <input
                  type="text"
                  v-model="editableNews.theme"
                  placeholder="Theme"
                  minlength="2"
                  maxlength="100"
                  required
                  class="white-bg round-corner p-1"
                />
              </div>

              <div>
                <input type="checkbox" v-model="editableNews.isHidden" />
                <span class="uppercase font-bold">Hidden News</span>
              </div>
            </div>

            <!-- delete and update btns -->
            <div class="pt-6 flex flex-col gap-2">
              <p>ID: {{ editableNews._id.trim() }}</p>
              <button
                @click="updateNewsHandler"
                class="edit-btn bg-green-600 light-headline p-2 hover:bg-green-700 cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useNews } from '../../../modules/useNews'
import type { News } from '../../../interfaces/news'

// Props
const props = defineProps<{ newsItem: News | null }>()
const editableNews = ref<News | null>(null)

watch(
  () => props.newsItem,
  (newVal) => {
    editableNews.value = newVal ? { ...newVal } : null
  },
  { immediate: true },
)

// Modal visibility
const isVisible = defineModel<boolean>('isVisible')

const toggleNews = (): void => {
  isVisible.value = !isVisible.value
}

const { fetchNews } = useNews()
onMounted(() => {
  fetchNews()
})

const emit = defineEmits(['updateNews'])
const updateNewsHandler = () => {
  if (editableNews.value) {
    emit('updateNews', editableNews.value)
  }
}
</script>

<style scoped>
/* add background behind the modal */
.modal-exit {
  background-color: rgba(0, 0, 0, 0.5);
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

.edit-btn {
  border-radius: 20px;
}
</style>
