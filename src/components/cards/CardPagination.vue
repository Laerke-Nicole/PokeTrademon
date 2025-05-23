<template>
    <div class="flex justify-center gap-4 pt-6" v-if="totalPages > 1">
      <button class="btn-1" @click="$emit('prev')" :disabled="currentPage <= 1">Prev</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn-1" @click="$emit('next')" :disabled="currentPage >= totalPages">Next</button>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    currentPage: number
    totalPages: number
  }>()
  
  defineEmits(['next', 'prev'])
  </script>
  