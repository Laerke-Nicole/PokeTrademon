<template>
  <!-- show only the first about us data -->
  <section v-if="aboutUs.length && aboutUs[0]" class="five-percent extra-dark-bg pt-30">
    <div class="grid grid-cols-2 light-bg round-corner shadow about-us-container">
      <div class="about-img-container">
        <img :src="aboutUs[0].imageURL.trim()" alt="about us image" class="about-img" />
      </div>

      <div class="flex flex-col justify-center align-center ten-percent p-6">
        <h2 class="pb-6 text-center" v-motion-fade-slide>{{ aboutUs[0].aboutUsTitle.trim() }}</h2>
        <div v-motion-fade-slide>
          <p class="text-center">{{ aboutUs[0].aboutUsText.trim() }}</p>
        </div>
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
.about-img-container {
  position: relative;
  display: inline-block;
}

/* make an overlay of the primary color */
.about-img-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary-color);
  opacity: 0.4;
}

.about-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 10px 0 0 10px;
}

/* responsive design */
@media screen and (max-width: 800px) {
  .about-us-container {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}
</style>
