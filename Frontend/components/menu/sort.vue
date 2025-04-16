<template>
  <!-- Select menu for mobile -->
  <div class="md:hidden ">
    <select
      v-model="localSelectedSort"
      class="w-full p-2 border border-slate-300 rounded-lg bg-white text-primary "
      @change="updateSort"
    >
      <option value="">Default</option>
      <option value="asc">Name: A to Z</option>
      <option value="desc">Name: Z to A</option>
      <option value="low-high">Price: Low to High</option>
      <option value="high-low">Price: High to Low</option>
    </select>
  </div>

  <!-- Sort card for medium screens and up -->
  <div
    class="hidden md:block bg-slate-200/10 backdrop-blur-md shadow-lg rounded-xl border border-slate-100 p-6 mb-8"
  >
    <h2 class="text-primary text-2xl font-bold mb-6">Sort By</h2>
    <div class="space-y-4">
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Name</h3>
        <div class="space-y-2">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="asc"
              :checked="localSelectedSort === 'asc'"
              class="text-primary focus:ring-primary"
              @change="updateSort('asc')"
            >
            <span>A to Z</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="desc"
              :checked="localSelectedSort === 'desc'"
              class="text-primary focus:ring-primary"
              @change="updateSort('desc')"
            >
            <span>Z to A</span>
          </label>
        </div>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Price</h3>
        <div class="space-y-2">
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="low-high"
              :checked="localSelectedSort === 'low-high'"
              class="text-primary focus:ring-primary"
              @change="updateSort('low-high')"
            >
            <span>Low to High</span>
          </label>
          <label class="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="high-low"
              :checked="localSelectedSort === 'high-low'"
              class="text-primary focus:ring-primary"
              @change="updateSort('high-low')"
            >
            <span>High to Low</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);
const localSelectedSort = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    localSelectedSort.value = newVal;
  },
  { immediate: true }
);

const updateSort = (value) => {
  // Handle both direct calls and event object from select
  const sortValue = typeof value === "string" ? value : localSelectedSort.value;
  localSelectedSort.value = sortValue;
  emit("update:modelValue", sortValue);
};
</script>
