<template>
    <section class="mission-vision-container five-percent pt-18 extra-dark-bg">
    <div class="flex flex-col justify-center align-center pb-12">
      <h2 class="text-center dark-headline" v-motion-fade-slide>Mission & vision</h2>
    </div>

    <div class="grid grid-cols-2 gap-6 ten-percent" v-motion-fade-slide>
      <div class="white-bg shadow-lg round-corner p-10">
        <img src="../../../public/images/alakazam.png" alt="Alakazam" class="pokemon-img-mission-vision">
        <h3 class="text-center pb-4 dark-headline">Our mission</h3>
        <p class="text-center dark-text">To provide collectors worldwide with authentic, high-quality Pokémon trading cards while fostering a community built on trust, knowledge, and shared passion. We strive to make collecting accessible to enthusiasts of all ages and backgrounds, preserving the legacy of Pokémon cards for generations to come.</p>
      </div>

      <div class="white-bg shadow-lg round-corner p-10">
        <img src="../../../public/images/xatu.png" alt="Xatu" class="pokemon-img-mission-vision">
        <h3 class="text-center pb-4 dark-headline">Our vision</h3>
        <p class="text-center dark-text">To become the world's most trusted resource for Pokémon card collectors, setting the industry standard for authentication, preservation, and education. We envision a global community where the joy of collecting is enhanced by knowledge, where every card tells a story, and where the wonder of Pokémon continues to inspire collectors of all generations.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
.mission-vision-container {
  position: relative;
  align-items: center;
  flex-direction: row;
  z-index: 0;
  overflow: hidden; 
}

.mission-vision-container::after {
  content: '';
  position: absolute;
  bottom: -50px; 
  left: 0;
  width: 100%;
  height: 100px;
  background-color: var(--primary-color);
  border-radius: 50% 50% 0 0 / 50% 50% 0 0;
  z-index: -1;
}

.pokemon-img-mission-vision {
  margin-top: -90px;
  margin-right: auto;
  margin-left: auto;
  height: 300px;
}
</style>