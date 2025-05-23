<template>
  <div v-if="visible" class="fixed inset-0 z-50 modal-bg flex items-center justify-center">
    <div
      class="light-bg dark:bg-gray-800 p-6 round-corner w-11/12 max-w-md relative max-h-[90vh] overflow-y-auto"
    >
      <button class="absolute top-2 right-2 dark-headline cursor-pointer" @click="close">✖</button>
      <h2 class="text-xl font-bold pb-4">{{ card.name.trim() }}</h2>

      <!-- card hover effect -->
      <div class="container noselect">
        <div class="canvas">
          <div class="tracker tr-1"></div>
          <div class="tracker tr-2"></div>
          <div class="tracker tr-3"></div>
          <div class="tracker tr-4"></div>
          <div class="tracker tr-5"></div>
          <div class="tracker tr-6"></div>
          <div class="tracker tr-7"></div>
          <div class="tracker tr-8"></div>
          <div class="tracker tr-9"></div>
          <div class="tracker tr-10"></div>
          <div class="tracker tr-11"></div>
          <div class="tracker tr-12"></div>
          <div class="tracker tr-13"></div>
          <div class="tracker tr-14"></div>
          <div class="tracker tr-15"></div>
          <div class="tracker tr-16"></div>
          <div class="tracker tr-17"></div>
          <div class="tracker tr-18"></div>
          <div class="tracker tr-19"></div>
          <div class="tracker tr-20"></div>
          <div class="tracker tr-21"></div>
          <div class="tracker tr-22"></div>
          <div class="tracker tr-23"></div>
          <div class="tracker tr-24"></div>
          <div class="tracker tr-25"></div>
          <div id="card">
            <img
              :src="card.images.large || card.images.small"
              alt="Card Image"
              class="mx-auto pb-4"
            />
          </div>
        </div>
      </div>

      <p class="pt-10"><strong>Supertype:</strong> {{ card.supertype.trim() }}</p>
      <p v-if="card.subtypes"><strong>Subtype:</strong> {{ card.subtypes.join(', ') }}</p>
      <p v-if="card.rarity"><strong>Rarity:</strong> {{ card.rarity.trim() }}</p>
      <p v-if="card.hp"><strong>HP:</strong> {{ card.hp.trim() }}</p>
      <p v-if="card.set"><strong>Set:</strong> {{ card.set.name.trim() }}</p>

      <div class="pt-4">
        <button class="btn-1" @click="handleAdd">Add to Collection</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokemonCard } from '../../interfaces/card'

const props = defineProps<{
  visible: boolean
  card: PokemonCard
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'add-to-collection', id: string): void
  (e: 'notify', message: string): void
}>()

const handleAdd = () => {
  emit('add-to-collection', props.card.id)
  emit('notify', '✅ Added to collection!')
}

const close = () => emit('close')
</script>

<style scoped>
/* bg color behind card */
.modal-bg {
  background-color: rgba(0, 0, 0, 0.5);
}

/* css for card hover effect */
.container {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 190 / 254;
  max-width: 270px;
  margin: 0 auto;
  transition: 200ms;
}

.container:active {
  transform: scale(0.95);
}

#card {
  position: absolute;
  inset: 0;
  transition: 700ms;
  width: 100%;
  height: 100%;
}

.tracker {
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: 200;
}

.tracker:hover ~ #card {
  transition: 300ms;
}

.container:hover #card::before {
  transition: 200ms;
  content: '';
}

.canvas {
  perspective: 800px;
  position: absolute;
  inset: 0;
  z-index: 200;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-template-areas:
    'tr-1 tr-2 tr-3 tr-4 tr-5'
    'tr-6 tr-7 tr-8 tr-9 tr-10'
    'tr-11 tr-12 tr-13 tr-14 tr-15'
    'tr-16 tr-17 tr-18 tr-19 tr-20'
    'tr-21 tr-22 tr-23 tr-24 tr-25';
  width: 100%;
  height: 100%;
  pointer-events: none;
}

#card::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  transition: 200ms;
}

.tr-1 {
  grid-area: tr-1;
}

.tr-2 {
  grid-area: tr-2;
}

.tr-3 {
  grid-area: tr-3;
}

.tr-4 {
  grid-area: tr-4;
}

.tr-5 {
  grid-area: tr-5;
}

.tr-6 {
  grid-area: tr-6;
}

.tr-7 {
  grid-area: tr-7;
}

.tr-8 {
  grid-area: tr-8;
}

.tr-9 {
  grid-area: tr-9;
}

.tr-10 {
  grid-area: tr-10;
}

.tr-11 {
  grid-area: tr-11;
}

.tr-12 {
  grid-area: tr-12;
}

.tr-13 {
  grid-area: tr-13;
}

.tr-14 {
  grid-area: tr-14;
}

.tr-15 {
  grid-area: tr-15;
}

.tr-16 {
  grid-area: tr-16;
}

.tr-17 {
  grid-area: tr-17;
}

.tr-18 {
  grid-area: tr-18;
}

.tr-19 {
  grid-area: tr-19;
}

.tr-20 {
  grid-area: tr-20;
}

.tr-21 {
  grid-area: tr-21;
}

.tr-22 {
  grid-area: tr-22;
}

.tr-23 {
  grid-area: tr-23;
}

.tr-24 {
  grid-area: tr-24;
}

.tr-25 {
  grid-area: tr-25;
}

.tr-1:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-2:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-3:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg);
}

.tr-4:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(5deg) rotateZ(0deg);
}

.tr-5:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg);
}

.tr-6:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-7:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-8:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(0deg) rotateZ(0deg);
}

.tr-9:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(5deg) rotateZ(0deg);
}

.tr-10:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(10deg) rotateY(10deg) rotateZ(0deg);
}

.tr-11:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-12:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-13:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
}

.tr-14:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(5deg) rotateZ(0deg);
}

.tr-15:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(0deg) rotateY(10deg) rotateZ(0deg);
}

.tr-16:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-17:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-18:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(0deg) rotateZ(0deg);
}

.tr-19:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(5deg) rotateZ(0deg);
}

.tr-20:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-10deg) rotateY(10deg) rotateZ(0deg);
}

.tr-21:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(-10deg) rotateZ(0deg);
}

.tr-22:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(-5deg) rotateZ(0deg);
}

.tr-23:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg);
}

.tr-24:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(5deg) rotateZ(0deg);
}

.tr-25:hover ~ #card {
  transition: 125ms ease-in-out;
  transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg);
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
									supported by Chrome, Edge, Opera and Firefox */
}
</style>
