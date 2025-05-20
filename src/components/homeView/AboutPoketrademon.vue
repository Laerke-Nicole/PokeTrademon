<template>
    <section>
        <div class="light-bg grid grid-cols-2 five-percent pt-18 about-poketrademon">
            <!-- text side -->
            <div>
                <h3 class="pb-6 text-center" v-motion-fade-slide>Trade Pokémon cards!</h3>
                <div v-motion-fade-slide>
                    <p class="text-center text-lg">Find your dream cards, trade, and battle with fellow Trainers!</p>
                    <p class="text-center text-lg">Poketrademon made trading quick and easy.</p>
                </div>
                
                <!-- image side -->
                <div class="flex justify-center align-center pt-10" v-motion-fade-slide>
                    <RouterLink to="/about"><button class="btn-1">Learn more</button></RouterLink>
                </div>
            </div>
            <div v-motion-fade-slide>
                <img src="../../../public/images/pikachu-card.png" alt="">
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

</script>

<style scoped>
.about-poketrademon h3 {
  font-size: 30px;
}
</style>