<template>
  <div class="market-wrapper">
    <ToastView ref="toastRef" />

    <CardSelector mode="view" @card-selected="openModal" @notify="handleToast" />

    <CardModal
      v-if="showModal && selectedCard"
      :visible="showModal"
      :card="selectedCard"
      @close="closeModal"
      @notify="handleToast"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { scrollToTop } from '../modules/scrollToTop/TopRouterView'
import type { PokemonCard } from '../interfaces/card'
import CardSelector from '../components/cards/CardSelector.vue'
import CardModal from '../components/cards/CardModal.vue'
import { state } from '../modules/globalStates/state'
import ToastView from '../components/shared/ToastView.vue'

const selectedCard = ref<PokemonCard | null>(null)
const showModal = ref(false)

const openModal = (card: PokemonCard) => {
  selectedCard.value = card
  showModal.value = true
}

const toastRef = ref<InstanceType<typeof ToastView> | undefined>()

const handleToast = (message: string) => {
  toastRef.value?.showToast(message, 'success')
}

const closeModal = () => {
  showModal.value = false
}

const router = useRouter()

// redirect to homepage if user isnt logged in and try to access the page
if (!state.isLoggedIn) {
  router.push('/')
}

// start at the top of the page
onMounted(() => {
  scrollToTop()
})
</script>

<style scoped>
.market-wrapper {
  margin-top: 8rem;
  padding: 0 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(to bottom, #f7f9fb, #e3eefe);
  border-radius: 1rem;
  padding-bottom: 4rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-selector-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  padding-top: 2rem;
}

.card-item {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  border-radius: 1rem;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.card-item:hover {
  transform: perspective(1000px) rotateY(4deg) scale(1.04);
  box-shadow: 0 10px 25px rgba(59, 76, 202, 0.3);
}

.card-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: bold;
  background-color: #ffde00;
  color: #3b4cca;
  border: 2px solid #b3a125;
  transition: 0.3s;
  cursor: pointer;
}

.card-button:hover {
  background-color: #ff0000;
  color: white;
  border-color: #cc0000;
}
</style>
