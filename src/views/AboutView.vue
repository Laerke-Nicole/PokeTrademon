<template>
  <!-- about us text -->
  <section class="five-percent extra-dark-bg pt-30">
    <div class="grid grid-cols-2 light-bg round-corner">
      <div class="about-img-container">
        <img src="../../public/images/about-us-img.jpg" alt="card collection" class="about-img" />
      </div>

      <div class="flex flex-col justify-center align-center ten-percent">
        <h2 class="pb-6 text-center" v-motion-fade-slide>From collectors to industry leaders</h2>
        <div v-motion-fade-slide>
          <p class="text-center">Founded in 2010 by a group of passionate Pokémon card enthusiasts, Poketrademon began as a small trading community in Esbjerg, Denmark. What started as weekend meetups at local game stores quickly evolved into one of the most trusted names in the Pokémon trading card industry.</p>
        </div>
      </div>
    </div>
  </section>


  <!-- mission and vision -->
  <section class="mission-vision-container five-percent pt-18 extra-dark-bg">
    <div class="flex flex-col justify-center align-center pb-12">
      <h2 class="text-center dark-headline" v-motion-fade-slide>Mission & vision</h2>
    </div>

    <div class="grid grid-cols-2 gap-6 ten-percent" v-motion-fade-slide>
      <div class="white-bg shadow-lg round-corner p-10">
        <img src="../../public/images/alakazam.png" alt="Alakazam" class="pokemon-img-mission-vision">
        <h3 class="text-center pb-4 dark-headline">Our mission</h3>
        <p class="text-center dark-text">To provide collectors worldwide with authentic, high-quality Pokémon trading cards while fostering a community built on trust, knowledge, and shared passion. We strive to make collecting accessible to enthusiasts of all ages and backgrounds, preserving the legacy of Pokémon cards for generations to come.</p>
      </div>

      <div class="white-bg shadow-lg round-corner p-10">
        <img src="../../public/images/xatu.png" alt="Xatu" class="pokemon-img-mission-vision">
        <h3 class="text-center pb-4 dark-headline">Our vision</h3>
        <p class="text-center dark-text">To become the world's most trusted resource for Pokémon card collectors, setting the industry standard for authentication, preservation, and education. We envision a global community where the joy of collecting is enhanced by knowledge, where every card tells a story, and where the wonder of Pokémon continues to inspire collectors of all generations.</p>
      </div>
    </div>
  </section>


  <!-- values -->
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
import { onMounted } from 'vue';
import { scrollToTop } from '../modules/scrollToTop/TopRouterView';

// start at the top of the page
onMounted(() => {
  scrollToTop(); 
});
</script>

<style scoped>
/* hero */
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


/* mission and vision */
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


/* values */
.number-text {
  font-weight: bold;
}
</style>