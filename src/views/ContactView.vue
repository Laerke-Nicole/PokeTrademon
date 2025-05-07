<template>
    <section class="pt-38 dark-bg five-percent">
        <div>
            <h1 class="black-headline pb-6">Contact us</h1>
            <p>Monday - Friday at 11:00 - 15:00</p>
            <p class="pb-6">Weekends are closed</p>
            <p>+45 23 27 21 09</p>
            <p>Support@Poketrademon.com</p>
        </div>

    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});
</script>

<style scoped>

</style>