<template>
  <div v-if="state.isLoggedIn && isAdmin" class="five-percent dark-bg pt-30">
    <div>
      <h1 class="pb-6 light-headline">Admin dashboard</h1>
      <div class="text-center light-text" v-if="loading">Loading...</div>
      <div class="text-center text-red-500" v-else-if="error">{{ error }}</div>
      <div v-else class="flex flex-col gap-18">
        <!-- news -->
        <div class="grid grid-cols-2 gap-18 admin-crud">
          <!-- add news -->
          <AddNews />

          <!-- updating news -->
          <UpdateNews />
        </div>

        <!-- about us -->
        <div class="grid grid-cols-2 gap-18 admin-crud">
          <!-- add about us -->
          <AddAboutUs />

          <!-- updating about us -->
          <UpdateAboutUs />
        </div>
      </div>
    </div>
  </div>

  <!-- make sure if user isnt admin they cant see the page -->
  <div v-else class="five-percent dark-bg pt-30">
    <h1 class="light-headline">Access Denied</h1>
    <p class="light-text">You do not have permission to access this page.</p>
    <button>
      <RouterLink to="/"><button class="btn-1">Go to Home</button></RouterLink>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { scrollToTop } from '../../modules/scrollToTop/TopRouterView'
import { state } from '../../modules/globalStates/state'
import { useUsers } from '../../modules/auth/userModels'
import { useNews } from '../../modules/useNews'
import { useAboutUs } from '../../modules/useAboutUs'
import AddNews from '../../components/admin/news/AddNews.vue'
import UpdateNews from '../../components/admin/news/UpdateNews.vue'
import AddAboutUs from '../../components/admin/aboutUs/AddAboutUs.vue'
import UpdateAboutUs from '../../components/admin/aboutUs/UpdateAboutUs.vue'

const { user, loadUser } = useUsers()

onMounted(async () => {
  await loadUser()
})

// checking if userrole is admin
const isAdmin = computed(() => user.value?.userRole === 'admin')

// news fetching
const { error, loading, fetchNews } = useNews()

// about us fetching
const { fetchAboutUs } = useAboutUs()

onMounted(() => {
  fetchNews()
  fetchAboutUs()
  scrollToTop()
})
</script>

<style scoped>
/* responsive design */
@media screen and (max-width: 800px) {
  .admin-crud {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
