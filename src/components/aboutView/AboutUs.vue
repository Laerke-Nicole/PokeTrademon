<template>
    <section class="five-percent extra-dark-bg pt-30">
    <div class="grid grid-cols-2 light-bg round-corner">
      <div class="about-img-container">
        <img src="../../../public/images/about-us-img.jpg" alt="card collection" class="about-img" />
      </div>

      <div class="flex flex-col justify-center align-center ten-percent">
        <h2 class="pb-6 text-center" v-motion-fade-slide>From collectors to industry leaders</h2>
        <div v-motion-fade-slide>
          <p class="text-center">Founded in 2010 by a group of passionate Pokémon card enthusiasts, Poketrademon began as a small trading community in Esbjerg, Denmark. What started as weekend meetups at local game stores quickly evolved into one of the most trusted names in the Pokémon trading card industry.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

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
</style>