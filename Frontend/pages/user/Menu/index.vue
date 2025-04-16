<template>
  <div>
    <MenuHeader/>
    <UContainer>
      <div id="menuGrid" ref="menuGridRef"  class="flex flex-col md:flex-row gap-8 mt-8">
        <div class="w-full md:w-[30%] flex flex-col gap-6">
          <MenuFilter v-model="selectedFilters" @change="handleFilterChange" />
          <MenuSort v-model="sortOrder" />
        </div>
        
        <div  class="w-full md:w-[70%]">
          <MenuSearch
            v-model="searchQuery"
            class="w-full mb-6"
            @update:model-value="handleSearch"
          />

          <div v-if="status === 'pending'" class="text-center p-10">
            <USkeleton v-for="n in 3" :key="n" class="h-56 w-full mb-3" />
          </div>

          <div
            v-else-if="status === 'error'"
            class="text-red-500 text-center p-10"
          >
            {{ error }}
            <div class="mt-4">
              <UButton color="primary" @click="handleResetFilters">Reset Filters</UButton>
            </div>
          </div>

          <div
            v-else-if="status === 'empty' || sortedMenu.length === 0"
            class="text-center p-10"
          >
            <div class="text-xl text-gray-700">No menu items found</div>
            <p class="text-gray-500 mb-4">
              Try changing your filters or search criteria
            </p>
            <UButton color="primary" @click="handleResetFilters">Reset Filters</UButton>
          </div>

          <div v-else>
            <div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MenuCard
                  v-for="item in paginatedItems"
                  :key="item.id || item._id"
                  :item="item"
                />
              </div>
            </div>

            <!-- Custom Pagination -->
            <div v-if="totalPages > 1" class="flex items-center justify-center my-8">
              <!-- Previous Button -->
              <button 
              :disabled="currentPage === 1"
              class="min-w-8 h-8 flex items-center justify-center rounded-full mx-1"
              :class="currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'"
              @click="handlePageChange(currentPage - 1)"
              >
                <span>Previous</span>
              </button>
              
              
              <!-- Ellipsis if needed -->
              <span v-if="showLeftEllipsis" class="mx-1">...</span>
              
              <!-- Middle Pages -->
              <button
                v-for="page in visiblePageNumbers"
                :key="page"
                class="min-w-8 h-8 flex items-center justify-center rounded-full mx-1"
                :class="currentPage === page ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'"
                @click="handlePageChange(page)"
              >
                <span>{{ page }}</span>
              </button>
              
              <!-- Ellipsis if needed -->
              <span v-if="showRightEllipsis" class="mx-1">...</span>
              
              <!-- Last Page (always show if not in visible pages) -->
              <button
                v-if="showLastPageButton"
                class="min-w-8 h-8 flex items-center justify-center rounded-full mx-1"
                :class="currentPage === totalPages ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'"
                @click="handlePageChange(totalPages)"
              >
                <span>{{ totalPages }}</span>
              </button>
              
              <!-- Next Button -->
              <button 
              :disabled="currentPage === totalPages"
              class="min-w-8 h-8 flex items-center justify-center rounded-full mx-1"
              :class="currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'"
              @click="handlePageChange(currentPage + 1)"
              >
                <span>Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({
  name : "Menu"
})

const route = useRoute();
const router = useRouter();
const menuGridRef = ref(null);

// Pagination settings
const currentPage = ref(1);
const itemsPerPage = 6;
const visiblePageCount = 5;

const {
  error,
  status,
  searchQuery,
  selectedFilters,
  sortOrder,
  sortedMenu,
  fetchMenu,
  resetFilters,
} = useMenuApi();

// Initialize with empty array to prevent undefined errors
const safeSortedMenu = computed(() => sortedMenu.value || []);

// Scroll to menu grid function
const scrollToMenuGrid = () => {
  nextTick(() => {
    const target = menuGridRef.value || document.getElementById('menuGrid');
    if (target) {
      const offset = 100;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const scrollToPosition = targetPosition - offset;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  });
};

// Computed properties for pagination
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(safeSortedMenu.value.length / itemsPerPage));
});

const paginatedItems = computed(() => {
  const items = safeSortedMenu.value;
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
});

// Custom pagination logic for visible page numbers
const visiblePageNumbers = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const halfVisible = Math.floor(visiblePageCount / 2);
  
  // Simple case: if we have fewer pages than our display limit, show all
  if (total <= visiblePageCount + 2) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  
  let start = Math.max(2, current - halfVisible);
  let end = Math.min(total - 1, start + visiblePageCount - 1);
  
  // Adjust start if we're near the end
  if (end === total - 1) {
    start = Math.max(2, end - visiblePageCount + 1);
  }
  
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

// Logic for showing ellipsis and first/last buttons

const showLastPageButton = computed(() => {
  return totalPages.value > 2 && !visiblePageNumbers.value.includes(totalPages.value);
});

const showLeftEllipsis = computed(() => {
  return visiblePageNumbers.value.length > 0 && visiblePageNumbers.value[0] > 2;
});

const showRightEllipsis = computed(() => {
  return visiblePageNumbers.value.length > 0 && 
         visiblePageNumbers.value[visiblePageNumbers.value.length - 1] < totalPages.value - 1;
});

// Watcher for route changes
watch(
  () => route.query,
  async (newQuery) => {
    try {
      const category = newQuery?.category || "all";
      const search = newQuery?.search || "";

      selectedFilters.value = category !== "all" 
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : "All";
      searchQuery.value = search;
      
      await fetchMenu();
      currentPage.value = 1;
      
      if (paginatedItems.value.length > 0) {
        scrollToMenuGrid();
      }
    } catch (err) {
      console.error("Error handling route change:", err);
      error.value = "Failed to load menu items";
      status.value = "error";
    }
  },
  { immediate: true }
);

// Watcher for sorted menu changes
watch(safeSortedMenu, (newItems) => {
  if (newItems.length === 0) {
    status.value = status.value === 'success' ? 'empty' : status.value;
  }
  // Reset to first page if current page exceeds total pages
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
});

// Filter change handler
const handleFilterChange = async () => {
  try {
    const category = selectedFilters.value === 'All'
      ? 'all'
      : selectedFilters.value.toLowerCase();

    if (route.query.category === category) return;

    await router.push({
      query: {
        ...route.query,
        category,
      },
    });
  } catch (err) {
    console.error("Filter change error:", err);
    error.value = "Failed to update filters";
    status.value = "error";
  }
};

// Search handler with debounce
const debounce = (fn, delay) => {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

const handleSearch = debounce(async () => {
  try {
    await router.push({
      query: {
        ...route.query,
        search: searchQuery.value,
      },
    });
  } catch (err) {
    console.error("Search error:", err);
    error.value = "Search failed";
    status.value = "error";
  }
}, 500);

// Page change handler
const handlePageChange = (page) => {
  // Validate that page is within bounds
  if (page < 1 || page > totalPages.value || page === currentPage.value) {
    return;
  }
  
  currentPage.value = page;
  scrollToMenuGrid();
};

// Reset filters handler
const handleResetFilters = async () => {
  try {
    resetFilters();
    currentPage.value = 1;
    await router.push({ query: {} });
  } catch (err) {
    console.error("Reset filter error:", err);
    error.value = "Failed to reset filters";
    status.value = "error";
  }
};
</script>