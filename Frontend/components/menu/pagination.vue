<template>
  <UPagination
    v-if="totalPages > 1"
    v-model="currentPageInternal"
    :page-count="totalPages"
    :total="totalItems"
    :ui="{
      wrapper: 'flex items-center justify-center mt-8',
      base: 'min-w-8 h-8 flex items-center justify-center rounded-full',
      default: {
        activeButton: {
          variant: 'solid',
          color: 'primary'
        },
        inactiveButton: {
          variant: 'ghost',
          color: 'gray'
        }
      }
    }"
    @update:model-value="onPageChange"
  />
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: false,
    default: 1
  },
  totalItems: {
    type: Number,
    required: false,
    default: 0
  }
});

const emit = defineEmits(['page-change']);

const currentPageInternal = ref(props.currentPage);

// Watch for external changes to currentPage
watch(() => props.currentPage, (newPage) => {
  currentPageInternal.value = newPage;
}, { immediate: true });

// Handle page changes
const onPageChange = (page) => {
  emit('page-change', page);
};
</script>