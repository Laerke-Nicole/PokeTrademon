<template>
  <transition name="fade">
    <div
      v-if="visible"
      :class="[
        'fixed top-6 right-6 px-4 py-2 rounded-lg shadow-xl text-white z-50',
        variant === 'success' ? 'bg-green-600' : 'bg-red-600',
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const message = ref('')
const variant = ref<'success' | 'error'>('success')

const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
  message.value = msg
  variant.value = type
  visible.value = true
  setTimeout(() => (visible.value = false), 3000)
}

defineExpose({ showToast })
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
