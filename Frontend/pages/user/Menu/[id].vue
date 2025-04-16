<template>
  <UContainer class="mt-[125px]">
    <!-- Item details card -->
    <h2 class="text-2xl font-bold text-primary mb-6">Meal Details</h2>
    <div
      class="bg-slate-200/10 backdrop-blur-md shadow-lg rounded-xl border border-slate-100 py-8 px-4 sm:px-6 my-8 transition-all duration-300"
    >
      <!-- Loading state -->
      <div v-if="loading" class="text-center p-6">
        <USkeleton class="h-64 w-full mb-4 rounded-xl" />
        <USkeleton class="h-8 w-3/4 mb-3" />
        <USkeleton class="h-6 w-2/3 mb-3" />
        <USkeleton class="h-4 w-full mb-2" />
        <USkeleton class="h-4 w-full" />
      </div>

      <!-- Error state -->
      <div v-if="error" class="text-red-500 text-center p-10 flex flex-col items-center">
        <div class="text-xl font-semibold mb-4">{{ error }}</div>
        <UButton color="primary cursor-pointer" size="lg" class="mt-4" @click="router.push('/user/menu')">
          Back to Menu
        </UButton>
      </div>

      <!-- Content when loaded -->
      <div v-if="item && !loading" class="p-2 sm:p-4">
        <!-- Mobile layout (stacked) -->
        <div class="flex flex-col lg:flex-row gap-8 justify-between">
          <!-- Image for mobile (top position) -->
          <div class="lg:hidden w-full text-center flex justify-center">
            <img
              :src="item.image.secure_url || '../../assets/images/Home/Menu1.png'"
              :alt="item.name"
              class="rounded-xl w-1/2 object-contain"
            >
          </div>

          <!-- Item details -->
          <div class="lg:w-1/2 flex flex-col">
            <h1 class="text-2xl sm:text-3xl font-bold text-primary my-2 sm:my-4">{{ item.name }}</h1>
            
            <div class="flex justify-between items-center my-3 sm:my-4">
              <span class="inline-block px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-sm font-medium">
                {{ item.category || 'UnCategorized' }}
              </span>
              <span class="font-semibold text-xl sm:text-2xl text-primary">{{ item.price }} EGP</span>
            </div>
            
            <div class="mt-4 flex-grow">
              <h2 class="font-semibold text-xl sm:text-2xl mb-2">Description</h2>
              <p class="text-base sm:text-lg text-gray-700">
                {{ item.description || 'No description available for this item.' }}
              </p>
            </div>
            
            <div class="mt-6 sm:mt-8">
              <UButton
                class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto flex justify-center cursor-pointer"
                @click="router.push('/user/menu')"
              >
                <span class="flex items-center justify-center">
                  <span class="mr-2">←</span> Back to Menu
                </span>
              </UButton>
            </div>
          </div>

          <!-- Image for desktop (right position) -->
          <div class="hidden lg:w-1/4 lg:flex justify-center items-center">
            <div class="sticky top-24">
              <img
                :src="item.image.secure_url || '../../assets/images/Home/Menu1.png'"
                :alt="item.name"
                class="rounded-xl w-full object-contain transform hover:scale-[1.02] transition-transform duration-300"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Related Items Section -->
    <MenuRelatedItems v-if="item" :current-item="item" />
  </UContainer>
</template>

<script setup>
definePageMeta({
  name : "Menu Item"
})
const route = useRoute();
const router = useRouter();
const itemId = route.params.id;

const item = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchItemDetails = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const data = await useApi(`/menu/getMenuItem/${itemId}`, "get");
    console.log(data);
    
    if (data && data.results) {
      item.value = data.results;
    } else {
      error.value = "Item not found";
    }
  } catch (err) {
    console.error("Error fetching menu item:", err);
    error.value = err.message || "Failed to load item details";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchItemDetails);
</script>