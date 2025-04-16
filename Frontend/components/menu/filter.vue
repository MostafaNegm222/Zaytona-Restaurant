<template>
  <!-- Select menu for mobile -->
  <div class="md:hidden">
    <select
      v-model="localSelectedFilter"
      class="w-full p-2 border border-slate-300 rounded-lg bg-white text-primary"
      @change="toggleFilter(localSelectedFilter)"
    >
      <option value="All">All</option>
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
  </div>

  <!-- Filter card for medium screens and up -->
  <div
    class="hidden md:block bg-slate-200/10 backdrop-blur-md shadow-lg overflow-hidden border border-slate-100 p-6 pt-8"
  >
    <h2 class="text-primary text-2xl font-bold">Filter</h2>
    <div class="mt-6 flex flex-col gap-4">
      <div>
        <input
          id="all"
          type="radio"
          name="filter"
          value="All"
          :checked="localSelectedFilter === 'All'"
          @change="toggleFilter('All')"
        >
        <label for="all" class="ms-4 text-lg text-primary">All</label>
      </div>
      <div v-for="category in categories" :key="category">
        <input
          :id="category.toLowerCase()"
          type="radio"
          name="filter"
          :value="category"
          :checked="localSelectedFilter === category"
          @change="toggleFilter(category)"
        >
        <label
          :for="category.toLowerCase()"
          class="ms-4 text-lg text-primary"
          >{{ category }}</label
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "All",
  },
});

const categories = ["Breakfast", "Dinner", "Lunch", "Dessert", "Drinks"];

const emit = defineEmits(["update:modelValue", "change"]);
const localSelectedFilter = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    localSelectedFilter.value = newVal || "All";
  },
  { immediate: true }
);

const toggleFilter = (filter) => {
  localSelectedFilter.value = filter;
  emit("update:modelValue", filter);
  emit("change");
};
</script>
