<template>
    <section v-if="aboutUs.length && aboutUs[0]" class="pt-38 dark-bg five-percent">
        <div>
            <h1 class="black-headline pb-6">Contact us</h1>
            <p>Monday - Friday at 11:00 - 15:00{{ aboutUs[0].openingHours.trim() }}</p>
            <p class="pb-6">Weekends are closed</p>
            <p>+45 23 27 21 09{{ aboutUs[0].phoneNumber.trim() }}</p>
            <p>Support@Poketrademon.com{{ aboutUs[0].email.trim() }}</p>
        </div>
    </section>

    <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';
import { useAboutUs } from '../modules/useAboutUs';


// AboutUs fetching
const { aboutUs, fetchAboutUs } = useAboutUs();

onMounted(() => {
  fetchAboutUs();
});

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});
</script>

<style scoped>

</style>