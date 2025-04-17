<template>
  <div class="my-6 recipe-card flex flex-col h-[400px] overflow-hidden">
    <!-- Fixed height image container -->
    <div class="h-[180px] overflow-hidden rounded-t-lg flex-shrink-0">
      <img
        :src="item.image.secure_url || '/images/Home/Menu1.png'"
        :alt="item.name"
        class="h-full w-full object-contain transition-transform duration-300 hover:scale-105 py-2"
        loading="lazy"
      >
    </div>
    
    <div class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-b-lg border border-slate-100 p-6 flex flex-col flex-grow">
      <!-- Header section with title and price -->
      <div class="flex justify-between items-start mb-2 flex-shrink-0">
        <h2 class="text-xl text-primary font-bold truncate mr-4">{{ item.name }}</h2>
        <span class="font-bold text-primary text-lg whitespace-nowrap">{{ item.price }} EGP</span>
      </div>
      
      <!-- Description with fixed height -->
      <div class="flex-grow overflow-hidden mb-4">
        <p class="text-[#777] line-clamp-3">
          {{ item.description || "No description available" }}
        </p>
      </div>
      
      <!-- Button at the bottom -->
      <UButton
        class="bg-primary text-white hover:bg-primary/90 w-full flex items-center justify-center mt-auto flex-shrink-0"
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