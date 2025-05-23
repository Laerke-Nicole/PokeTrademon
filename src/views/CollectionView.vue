<template>
  <div class="pt-30 five-percent dark-bg">
    <ToastView ref="toastRef" />

    <h2 class="text-xl font-bold pb-6 dark-headline">Your Collection</h2>

    <div v-if="loading" class="dark-text">Loading your cards...</div>
    <div v-else-if="error" class="dark-text">{{ error }}</div>
    <div v-else-if="collection.length === 0" class="dark-text">
      You have no cards in your collection.
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4" v-else>
      <CollectionCard
        v-for="card in collection"
        :key="card.cardId"
        :card="card"
        @update="updateCard"
        @delete="deleteCard"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCollection } from '../modules/useCollection'
import CollectionCard from '../components/cards/CollectionCard.vue'
import ToastView from '../components/shared/ToastView.vue'
import { state } from '../modules/globalStates/state'
import { scrollToTop } from '../modules/scrollToTop/TopRouterView'
import { useUsers } from '../modules/auth/userModels'

const router = useRouter()
const toastRef = ref<InstanceType<typeof ToastView> | null>(null)

const { user, loadUser } = useUsers()
const {
  collection,
  loading,
  error,
  fetchCollection,
  updateCardInCollection,
  deleteCardFromCollection,
} = useCollection()

const updateCard = async (cardId: string, quantity: number, condition: string) => {
  if (user.value?._id) {
    try {
      await updateCardInCollection(user.value._id, cardId, quantity, condition)
      toastRef.value?.showToast('Card updated successfully', 'success')
    } catch {
      toastRef.value?.showToast('Failed to update card', 'error')
    }
  }
}

const deleteCard = async (cardId: string) => {
  if (user.value?._id) {
    try {
      await deleteCardFromCollection(user.value._id, cardId)
      toastRef.value?.showToast('Card deleted successfully', 'success')
    } catch {
      toastRef.value?.showToast('Failed to delete card', 'error')
    }
  }
}

onMounted(async () => {
  scrollToTop()
  await loadUser()

  if (!state.isLoggedIn || !user.value?._id) {
    router.push('/auth')
    return
  }

  await fetchCollection(user.value._id)
})
</script>
