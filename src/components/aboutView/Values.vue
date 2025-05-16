<template>
    <section class="five-percent pt-18 dark-bg">
    <div class="flex flex-col justify-center align-center pb-10 ten-percent" v-motion-fade-slide>
      <h2 class="text-center dark-headline">Our values</h2>
      <p class="dark-text text-center ten-percent">These principles guide everything we do, from authenticating rare cards to welcoming newcomers to the world of Pokémon collecting.</p>
    </div>

    <div class="grid grid-cols-3 gap-6 ten-percent" v-motion-fade-slide>
      <div class="white-bg shadow-lg round-corner p-10">
        <p class="number-text text-center blue-text text-6xl pb-4">01</p>
        <h4 class="text-center pb-4 dark-headline">Authenticity</h4>
        <p class="text-center dark-text">We maintain rigorous authentication standards to ensure every card in our inventory is genuine, properly graded, and accurately represented.</p>
      </div>

      <div class="white-bg shadow-lg round-corner p-10">
        <p class="number-text text-center blue-text text-6xl pb-4">02</p>
        <h4 class="text-center pb-4 dark-headline">Community</h4>
        <p class="text-center dark-text">We believe in building and nurturing a welcoming community where collectors can share knowledge, experiences, and the joy of Pokémon cards.</p>
      </div>

      <div class="white-bg shadow-lg round-corner p-10">
        <p class="number-text text-center blue-text text-6xl pb-4">03</p>
        <h4 class="text-center pb-4 dark-headline">Education</h4>
        <p class="text-center dark-text">We're committed to educating collectors about card history, value factors, preservation techniques, and market trends to empower informed collecting.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
.number-text {
  font-weight: bold;
}
</style>