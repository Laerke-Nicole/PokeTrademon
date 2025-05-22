<template>
  <!-- show only the first about us data -->
  <section
    v-if="aboutUs.length && aboutUs[0]"
    class="mission-vision-container five-percent pt-18 extra-dark-bg"
  >
    <div class="flex flex-col justify-center align-center pb-12">
      <h2 class="text-center light-headline" v-motion-fade-slide>Mission & vision</h2>
    </div>

    <div class="grid grid-cols-2 gap-6 ten-percent" v-motion-fade-slide>
      <div class="white-bg shadow round-corner p-10">
        <img
          src="../../../public/images/alakazam.png"
          alt="Alakazam"
          class="pokemon-img-mission-vision"
        />
        <h3 class="text-center pb-4 dark-headline">Our mission</h3>
        <p class="text-center dark-text">{{ aboutUs[0].mission.trim() }}</p>
      </div>

      <div class="white-bg shadow round-corner p-10">
        <img src="../../../public/images/xatu.png" alt="Xatu" class="pokemon-img-mission-vision" />
        <h3 class="text-center pb-4 dark-headline">Our vision</h3>
        <p class="text-center dark-text">{{ aboutUs[0].vision.trim() }}</p>
      </div>
    </div>
  </section>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAboutUs } from '../../modules/useAboutUs'

// AboutUs fetching
const { aboutUs, fetchAboutUs } = useAboutUs()

onMounted(() => {
  fetchAboutUs()
})
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
