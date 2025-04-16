<template>
    <div v-if="relatedItems.length > 0" class="my-8">
      <h2 class="text-2xl font-bold text-primary mb-6">You May Also Like</h2>
      
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <USkeleton v-for="n in 4" :key="n" class="h-64 w-full" />
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
        <div v-for="item in relatedItems" :key="item.id || item._id" class="flex flex-col justify-between">
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
                  <h2 class="text-2xl text-primary font-bold text-ellipsis overflow-hidden whitespace-nowrap">{{ item.name }}</h2>
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
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    currentItem: {
      type: Object,
      required: true
    }
  });
  
  const relatedItems = ref([]);
  const loading = ref(true);
  const error = ref(null);
  
  // Function to get random items from an array
  const getRandomItems = (array, count) => {
    // Create a copy to avoid modifying the original array
    const shuffled = [...array];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Return the first 'count' items or all if less than count
    return shuffled.slice(0, count);
  };
  
  // Fetch related items
  const fetchRelatedItems = async () => {
    if (!props.currentItem || !props.currentItem.category) {
      loading.value = false;
      return;
    }
    
    loading.value = true;
    error.value = null;
    
    try {
      // Use the existing API utility 
      const data = await useApi('/menu/getMenuStatic', 'get');
      
      if (!data || !data.results) {
        throw new Error('Failed to fetch menu items');
      }
      
      // Get the items array from the response
      const menuItems = Array.isArray(data.results) 
        ? data.results 
        : data.results.items || data.results.data || [];
      
      // Filter items by the same category as current item, excluding the current item
      const sameCategory = menuItems.filter(item => 
        item.category?.toLowerCase() === props.currentItem.category?.toLowerCase() && 
        (item.id || item._id) !== (props.currentItem.id || props.currentItem._id)
      );
      
      // Get up to 4 random items from the same category
      relatedItems.value = getRandomItems(sameCategory, 4);
      
    } catch (err) {
      console.error('Error fetching related items:', err);
      error.value = err.message || 'Failed to load related items';
    } finally {
      loading.value = false;
    }
  };
  
  // Watch for changes in current item to refresh related items
  watch(() => props.currentItem, (newItem) => {
    if (newItem && newItem.category) {
      fetchRelatedItems();
    }
  }, { immediate: true });
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