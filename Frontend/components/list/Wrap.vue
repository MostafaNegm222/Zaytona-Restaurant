<template>
  <div>
    <template v-if="status === 'pending'">
      <slot name="pending">
        <ListPending />
      </slot>
    </template>

    <template v-else-if="status === 'error'">
      <slot name="error">
        <ListError :error="error" />
      </slot>
    </template>

    <template v-else-if="!menu.data?.length">
      <slot name="empty">
        <ListEmpty />
      </slot>
    </template>

    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup>
defineProps({
  menu: {
    type: Object,
    required: false,
    default: () => ({ data: [] })
  },
  status: {
    type: String,
    required: true,
    validator: (value) => ['idle', 'pending', 'success', 'error', 'empty'].includes(value)
  },
  error: {
    type: [String, Object, Error],
    default: null
  }
});
</script>