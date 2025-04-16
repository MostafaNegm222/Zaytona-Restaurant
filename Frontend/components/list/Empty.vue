<!-- EmptyState.vue -->
<template>
    <div class="text-center p-10">
      <h3 class="text-xl font-semibold text-gray-600">No menu items found</h3>
      <p class="text-gray-500 mt-2">Try adjusting your filters or search query</p>
      <UButton 
        class="mt-4" 
        color="primary" 
        @click="resetFilters"
      >
        Reset Filters
      </UButton>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['reset']);
  
  const resetFilters = () => {
    emit('reset');
  };
  </script>