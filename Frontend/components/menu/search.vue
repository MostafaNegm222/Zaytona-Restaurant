<template>
  <UInput
    v-model="searchInput"
    icon="i-heroicons-magnifying-glass"
    size="lg"
    variant="outline"
    placeholder="Search menu items..."
    @update:model-value="handleSearch"
  >
    <template v-if="searchInput" #trailing>
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark"
        size="xs"
        aria-label="Clear search"
        @click="clearSearch"
      />
    </template>
  </UInput>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const searchInput = ref(props.modelValue);
let debounceTimeout = null;

// Watch for external changes to modelValue
watch(() => props.modelValue, (newValue) => {
  if (newValue !== searchInput.value) {
    searchInput.value = newValue || '';
  }
}, { immediate: true });

// Simple debounce implementation
const debounce = (fn, delay) => {
  return (...args) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const emitSearch = () => {
  emit('update:modelValue', searchInput.value);
};

const debouncedEmit = debounce(emitSearch, 300);

const handleSearch = () => {
  debouncedEmit();
};

const clearSearch = () => {
  searchInput.value = '';
  emit('update:modelValue', '');
};

onUnmounted(() => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
});
</script>