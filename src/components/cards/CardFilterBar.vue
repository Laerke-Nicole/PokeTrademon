<template>
  <div class="flex flex-col md:flex-row gap-4 pb-6">
    <input
      type="text"
      placeholder="Search Pokémon..."
      class="p-2 border round-corner white-bg dark-text"
      :value="searchQuery"
      @input="onSearchInput"
    />

    <select
      :value="selectedSupertype"
      @change="onSupertypeChange"
      class="p-2 border white-bg round-corner dark-text"
    >
      <option value="">All Supertypes</option>
      <option value="Pokémon">Pokémon</option>
      <option value="Trainer">Trainer</option>
      <option value="Energy">Energy</option>
    </select>

    <!-- Uncomment if sortBy is enabled -->
    <!--
      <select
        :value="sortBy"
        @change="onSortChange"
        class="p-2 border white-bg round-corner dark-text"
      >
        <option value="">Sort by</option>
        <option value="name">Name (A–Z)</option>
        <option value="-name">Name (Z–A)</option>
        <option value="hp">HP (Low–High)</option>
        <option value="-hp">HP (High–Low)</option>
        <option value="rarity">Rarity</option>
        <option value="set.name">Set Name</option>
      </select>
      -->
  </div>
</template>

<script setup lang="ts">
defineProps<{
  searchQuery: string
  selectedSupertype: string
  // sortBy: string
}>()

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedSupertype', value: string): void
  // (e: 'update:sortBy', value: string): void
  (e: 'filter'): void
}>()

const onSearchInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:searchQuery', target.value)
  emit('filter')
}

const onSupertypeChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('update:selectedSupertype', target.value)
  emit('filter')
}

// Uncomment when using sortBy
// const onSortChange = (e: Event) => {
//   const target = e.target as HTMLSelectElement
//   emit('update:sortBy', target.value)
//   emit('filter')
// }
</script>
