<template>
    <section class="hero-section">
      <div class="hero-content five-percent grid grid-cols-3">
        <!-- left side with headline -->
        <div class="w-1/3 hero-title">
          <h1 class="leading-tight pb-10 dark-headline" v-motion-fade-slide>Universe of Pokemon card trading</h1>
          
          <div class="flex gap-4">
            <RouterLink to="/market"><button class="btn-1" v-motion-fade-slide>Explore</button></RouterLink>
            <RouterLink to="/profile"><button class="btn-3" v-motion-fade-slide>Your collection</button></RouterLink>  
          </div>
        </div>

        <!-- pikachu model -->
        <div class="pikachu-model-container w-1/3">
          <!-- pikachu 3D -->
          <PikachuModel />
        </div>

        <!-- right side with welcome text -->
        <div class="w-1/3 hero-text">
          <p class="dark-text" v-motion-fade-slide>Discover the ultimate collection of Pokemon trading cards. Explore the vast selection, engage with fellow enthusiasts, and embark on an unforgettable journey into the realm of the beloved pocket monsters.</p>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import PikachuModel from '../threejs/pikachumodel/PikachuModel.vue'
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
  background-color: var(--primary-color-dark);
}

.hero-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--primary-color);
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