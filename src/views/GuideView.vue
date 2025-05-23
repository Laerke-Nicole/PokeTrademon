<template>
  <div class="container white-bg">
    <!-- Left fixed image -->
    <div class="left-guide">
      <img src="../../public/images/guide.jpg" alt="Pokemon Trading Guide" />
    </div>

    <!-- Right guide text -->
    <div class="right-guide py-30 five-percent" v-motion-fade-slide>
      <h1>How to Start Trading</h1>

      <!-- loop of steps -->
      <div 
        class="step" 
        v-for="(step, index) in steps" 
        :key="index"
        >

        <!-- number and info on the steps -->
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-text">
          <h2>{{ step.title }}</h2>
          <p class="dark-text">{{ step.description }}</p>
        </div>
      </div>

      <RouterLink to="/register" class="btn-2">Get Started Today</RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { steps } from '../components/guide/guide'
import { scrollToTop } from '../modules/scrollToTop/TopRouterView'
import { onMounted } from 'vue'


onMounted(() => {
  scrollToTop()
})
</script>

<style scoped>
.container {
  display: flex;
}

.left-guide {
  width: 50%;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.left-guide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right-guide {
  width: 50%;
  overflow-y: auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--dark-headline);
}

.step {
  display: flex;
  margin-bottom: 2.5rem;
}

.step-number {
  font-size: 2rem;
  font-weight: bold;
  color: var(--tertiary-color);
  margin-right: 2rem;
}

.step-text h2 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}


/* responsive design */
@media screen and (max-width: 800px) {
  .container {
    flex-direction: column;
  }

  .left-guide,
  .right-guide {
    width: 100%;
    height: auto;
    position: static;
    overflow: visible;
  }

  .left-guide img {
    height: auto;
  }
}
</style>
