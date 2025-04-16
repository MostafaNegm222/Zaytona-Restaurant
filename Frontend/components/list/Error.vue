<template>
    <div class="error-container  p-4 border border-red-200 bg-red-50 rounded-lg text-center">
      <div class="error-icon">
        <UIcon name="i-heroicons-exclamation-triangle" class="text-red-500 text-4xl" />
      </div>
      <h3 class="error-title text-lg font-medium text-red-800 mt-2">{{ error.message || 'Error occurred' }}</h3>
      
      <template v-if="error.details">
        <p v-if="typeof error.details === 'string'" class="error-details text-sm text-red-700 mt-2">
          {{ error.details }}
        </p>
        <ul v-else-if="Array.isArray(error.details)" class="error-details-list text-sm text-red-700 mt-2 list-disc list-inside text-left">
          <li v-for="(detail, index) in error.details" :key="index">
            {{ detail }}
          </li>
        </ul>
        <pre v-else-if="error.details" class="error-details-pre text-xs text-red-900 mt-2 p-2 bg-red-100 rounded overflow-auto">
          {{ JSON.stringify(error.details, null, 2) }}
        </pre>
      </template>
      
      <div v-if="error.status || error.url" class="error-meta text-xs text-gray-600 mt-2">
        <p v-if="error.status">Status: {{ error.status }} {{ error.statusText }}</p>
        <p v-if="error.url">URL: {{ error.url }}</p>
      </div>
      
      <UButton
        color="red"
        variant="outline"
        class="mt-4"
        @click="$emit('retry')"
      >
        Retry
      </UButton>
    </div>
  </template>
  
  <script setup>
  defineProps({
    error: {
      type: [Object, String, Error],
      default: () => ({})
    }
  });
  
  defineEmits(['retry']);
  </script>
  