<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import { scrollToTop } from '../../modules/scrollToTop/TopRouterView';

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});

</script>

<style scoped>

</style>