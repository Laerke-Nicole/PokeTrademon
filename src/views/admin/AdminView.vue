<template>
    <div v-if="state.userRole === 'admin'" class="five-percent dark-bg pt-30">
      <div>
        <h1>Admin View</h1>
        <div class="text-center" v-if="loading">Loading...</div>                            
        <div class="text-center text-red-500" v-else-if="error">{{ error }} </div>                        
        <div class="flex flex-wrap -mx-2" v-else> 
          

          <!-- add news -->
          <AddNews />

          <!-- updating news -->
          <UpdateNews />
        </div>
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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { scrollToTop } from '../../modules/scrollToTop/TopRouterView';
import { state } from '../../modules/globalStates/state';
import { useNews } from '../../modules/useNews';
import AddNews from '../../components/admin/AddNews.vue';
import UpdateNews from '../../components/admin/UpdateNews.vue';

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
const { error, loading, fetchNews } = useNews();

onMounted(() => {
  fetchNews();
});

</script>

<style scoped>

</style>