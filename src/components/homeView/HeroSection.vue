<template>
  <section class="hero-section">
    <div class="hero-content five-percent grid grid-cols-3">
      <!-- left side with headline -->
      <div class="w-1/3 hero-title">
        <h1 class="leading-tight pb-10 light-headline" v-motion-fade-slide>
          Universe of Pokemon card trading
        </h1>

        <div v-if="state.isLoggedIn && isUser" class="flex gap-4">
          <RouterLink to="/market"
            ><button class="btn-1" v-motion-fade-slide>Explore</button></RouterLink
          >
          <RouterLink to="/collection"
            ><button class="btn-3" v-motion-fade-slide>Your collection</button></RouterLink
          >
        </div>
      </div>

      <!-- pikachu model -->
      <div class="pikachu-model-container w-1/3">
        <!-- pikachu 3D -->
        <PikachuModel />
      </div>

      <!-- right side with welcome text -->
      <div v-if="!state.isLoggedIn" class="w-1/3 hero-text">
        <RouterLink to="/guide"
          ><button class="btn-2" v-motion-fade-slide>Start trading with us</button></RouterLink
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PikachuModel from '../threejs/pikachumodel/PikachuModel.vue'
import { onMounted, computed } from 'vue'
import { state } from '../../modules/globalStates/state'
import { useUsers } from '../../modules/auth/userModels'

const { user, loadUser } = useUsers()

onMounted(async () => {
  if (state.isLoggedIn) {
    await loadUser()
  }
})

// checking if user is admin or just user
const isUser = computed(() => user.value?.userRole === 'user')
</script>

<style scoped>
.hero-section {
  position: relative;
  height: 97vh;
  padding-top: 70px;
  display: flex;
  align-items: center;
  flex-direction: row;
  z-index: 0;
  overflow: hidden;
  background-color: var(--primary-color);
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--tertiary-color);
  clip-path: polygon(65% 0, 100% 0%, 100% 100%, 35% 100%);
  z-index: -1;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: -50px;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: var(--secondary-color);
  border-radius: 50% 50% 0 0 / 50% 50% 0 0;
  z-index: -1;
}

.hero-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* pikachu model */
.model-container {
  width: 100%;
  height: 400px;
  min-height: 400px;
}

.pikachu-model-container {
  height: 400px;
  position: relative;
  width: 30%;
}

/* responsive design */
@media screen and (max-width: 800px) {
  .hero-content {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    flex-direction: column;
  }

  .hero-content div {
    width: 100%;
  }

  .pikachu-model-container {
    display: none;
  }

  .hero-title h1 {
    padding-bottom: 20px;
  }

  .hero-text {
    padding-top: 40px;
  }
}
</style>
