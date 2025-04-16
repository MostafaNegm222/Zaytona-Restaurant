<template>
  <div class="my-6 recipe-card flex flex-col justify-between">
    <div class="h-[180px] overflow-hidden rounded-t-lg">
      <img
        :src="item.image.secure_url || '/images/Home/Menu1.png'"
        :alt="item.name"
        class="h-full w-full object-contain transition-transform duration-300 hover:scale-105 py-2"
        loading="lazy"
      >
    </div>
    <div class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-b-lg border border-slate-100 py-6 px-6">
      <div>
        <div class="flex justify-between items-center">
          <h2 class="text-2xl text-primary font-bold">{{ item.name }}</h2>
          <span class="font-bold text-primary text-xl text-center ms-4">{{ item.price }} EGP</span>
        </div>
        <p class="text-[#777] mt-2 line-clamp-2">
          {{ item.description || "No description available" }}
        </p>
      </div>
      <UButton
        class="bg-primary text-white hover:bg-primary/90 mt-4 w-full flex items-center justify-center"
        :to="`/user/menu/${item.id || item._id}`"
        tag="nuxt-link"
      >
        View More
      </UButton>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
    validator: (item) => {
      return item.name && typeof item.price === 'number'
    }
  }
});
</script>

<style scoped>
.recipe-card {
  transition: all 0.3s ease;
}
.recipe-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
</style>