<template>
    <div v-if="state.userRole === 'admin'" class="five-percent dark-bg pt-18">

    </div>

    <!-- make sure if user isnt admin they cant see the page -->
    <div v-else class="five-percent dark-bg pt-18">
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <button> 
        <RouterLink to="/">Go to Home</RouterLink>
      </button>
      
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { scrollToTop } from '../../modules/scrollToTop/TopRouterView';
import { state } from '../../modules/globalStates/state';

const router = useRouter();

// redirect to homepage if user is not admin
if (state.userRole !== 'admin') {
  router.push('/auth');
}

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});

</script>

<style scoped>

</style>