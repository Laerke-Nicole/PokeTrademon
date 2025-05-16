<template>
    <section>
        <div class="explore-container light-bg grid grid-cols-2 five-percent gap-12 py-18">
        <!-- Image side -->
        <div class="flex items-center justify-center" v-motion-fade-slide>
            <img src="../../../public/images/pikachu-img.svg" alt="Pikachu Image" class="max-w-full h-auto" />
        </div>

        <!-- Text side -->
        <div class="flex flex-col justify-center space-y-4 px-8">
            <p class="yellow-text" v-motion-fade-slide>Collect cards today</p>
            <h2 class="dark-headline pb-6" v-motion-fade-slide>More than 3000 cards to trade</h2>
            <p class="dark-text pb-10" v-motion-fade-slide>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet perferendis voluptatum ab! Sed odit quia doloremque sapiente dicta maxime, accusantium repellat, ullam dolorem mollitia explicabo, dolorum a molestiae laboriosam laudantium.</p>
            <RouterLink to="/collection"><button class="btn-1" v-motion-fade-slide>Start trading</button></RouterLink>
        </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* responsive design */
@media screen and (max-width: 800px) {
  .explore-container {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>