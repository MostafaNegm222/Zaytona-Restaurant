<template>
  <div class="flex flex-col lg:flex-row items-center w-full py-8">
    <div class="px-8 lg:w-[40%]">
      <div>
        <h1
          class="text-xl md:text-2xl font-bold mb-4 text-dark-blue cursor-default w-full lg:w-[60%]"
        >
          Pre-Order Your Meal
        </h1>

        <p class="text-gray-500 cursor-default hidden md:block">
          Would you like to pre-order your meal? This will save you time and
          ensure your food is ready when you arrive.
        </p>
      </div>
      <div class="mt-7 hidden lg:block">
        <h3 class="font-bold cursor-default">Need help?</h3>
        <h4>Call +20 100 506 6611</h4>
      </div>
    </div>

    <USeparator
      color="primary"
      type="solid"
      orientation="vertical"
      class="h-48 hidden lg:block"
    />

    <div class="px-8 lg:w-[60%] flex flex-col">
      <!-- Initial Choice -->
      <div v-if="!formData.cart.preOrder && !proceedingToNext">
        <h1
          class="text-xl md:text-2xl font-bold mb-4 text-primary cursor-default"
        >
          Pre-Order Options
        </h1>

        <div class="mt-6">
          <div class="flex flex-col space-y-4">
            <UButton
              label="Yes, I'd like to pre-order"
              class="bg-primary text-white cursor-pointer hover:text-white w-full md:w-[50%]"
              @click="enablePreOrder"
            />
            <UButton
              label="No, I'll order at the restaurant"
              variant="outline"
              class="border-primary text-primary cursor-pointer w-full md:w-[50%]"
              @click="disablePreOrder"
            />
          </div>
        </div>
      </div>

      <!-- Next Step Indicator -->
      <div v-if="proceedingToNext" class="mt-6">
        <h1
          class="text-xl md:text-2xl font-bold mb-4 text-primary cursor-default"
        >
          Proceeding to Next Step
        </h1>
        <div
          class="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
        >
          <div class="text-green-600 flex justify-center mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-green-700 mb-2">Thank You!</h3>
          <p class="text-green-600">
            You've chosen to order at the restaurant. Please continue with the
            reservation process.
          </p>
        </div>
      </div>

      <!-- Cart Summary (only visible when items selected but menu closed) -->
      <div
        v-if="formData.cart.preOrder && cartItems.length > 0 && !showMenu"
        class="mt-6"
      >
        <h1 class="text-2xl font-bold mb-4 text-primary cursor-default">
          Your Pre-Order
        </h1>

        <div class="bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-lg flex items-center">
              <span class="mr-2 cursor-default">Your Order</span>
              <span
                class="bg-primary text-white text-xs rounded-full px-2 py-1 cursor-default"
                >{{ getTotalItems() }} items</span
              >
            </h3>
            <UButton
              icon="i-heroicons-pencil"
              color="primary"
              variant="ghost"
              label="Edit Order"
              class="cursor-pointer"
              @click="showMenu = true"
            />
          </div>

          <div class="max-h-60 overflow-y-auto mb-4">
            <div
              v-for="item in cartItems"
              :key="item.menuItemId"
              class="flex justify-between py-2 border-b border-gray-100 last:border-0"
            >
              <div class="flex items-center">
                <div
                  class="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mr-3 cursor-default"
                >
                  {{ item.quantity }}
                </div>
                <div>
                  <p class="font-medium cursor-default">{{ item.name }}</p>
                  <p class="text-sm text-gray-500 cursor-default">
                    {{ item.price }} EGP each
                  </p>
                </div>
              </div>
              <p class="font-semibold cursor-default">
                {{ (item.price * item.quantity) }} EGP
              </p>
            </div>
          </div>

          <div
            class="font-bold flex justify-between text-lg border-t border-gray-200 pt-3 cursor-default"
          >
            <p>Total</p>
            <p class="text-primary">{{ calculateTotal() }} EGP</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-7 flex justify-between lg:hidden w-full">
      <h3 class="font-bold cursor-default">Need help?</h3>
      <h4>Call +20 100 506 6611</h4>
    </div>
  </div>

  <!-- Full Screen Menu Modal -->
  <Teleport to="body">
    <div
      v-if="showMenu"
      class="fixed inset-0 z-50 overflow-hidden bg-gray-900/70 backdrop-blur-sm flex items-center justify-center"
    >
      <div
        class="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl m-4 max-h-[90vh] overflow-hidden flex flex-col"
      >
        <!-- Header -->
        <div
          class="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10"
        >
          <h2 class="text-2xl font-bold text-primary cursor-default">
            {{
              formData.mealType === "breakfast"
                ? "Breakfast Menu"
                : "Dinner Menu"
            }}
          </h2>
          <div class="flex gap-3">
            <UButton
              icon="i-heroicons-x-mark"
              color="gray"
              variant="ghost"
              class="text-gray-500 cursor-pointer"
              @click="resetPreOrder"
            />
          </div>
        </div>

        <!-- Menu Content -->
        <div class="p-6 overflow-y-auto flex-1">
          <!-- Category Navigation -->
          <div class="flex overflow-x-auto space-x-2 pb-3 mb-6 scrollbar-hide">
            <UButton
              v-for="category in categories"
              :key="category"
              :label="category"
              :variant="selectedCategory === category ? 'solid' : 'outline'"
              color="primary"
              class="whitespace-nowrap cursor-pointer"
              @click="selectCategory(category)"
            />
          </div>

          <!-- Menu Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="(item, index) in paginatedMenuItems"
              :key="index"
              class="border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div class="flex flex-col h-full">
                <div class="relative h-48">
                  <img
                    :src="item.image?.secure_url || item.image"
                    :alt="item.title || item.name"
                    class="h-full w-full object-contain"
                  >
                  <div
                    class="absolute top-0 right-0 m-2 px-3 py-1 text-xl  text-primary cursor-default font-bold"
                  >
                    {{ item.price }} EGP
                  </div>
                </div>
                <div class="p-4 flex flex-col flex-grow">
                  <h3 class="font-bold text-lg mb-2 cursor-default">
                    {{ item.title || item.name }}
                  </h3>
                  <p class="text-gray-600 mb-auto cursor-default">
                    {{ item.description }}
                  </p>

                  <!-- Quantity Controls -->
                  <div class="flex items-center justify-end mt-4">
                    <div
                      v-if="getCartItem(item._id)"
                      class="flex items-center space-x-3 border border-gray-200 rounded-lg px-2 py-1"
                    >
                      <UButton
                        icon="i-heroicons-minus"
                        color="primary"
                        variant="ghost"
                        class="h-8 w-8 cursor-pointer"
                        @click="decreaseQuantity(item)"
                      />
                      <span class="text-lg font-medium w-6 text-center">{{
                        getCartItem(item._id).quantity
                      }}</span>
                      <UButton
                        icon="i-heroicons-plus"
                        color="primary"
                        variant="ghost"
                        class="h-8 w-8 cursor-pointer"
                        @click="increaseQuantity(item)"
                      />
                    </div>
                    <UButton
                      v-else
                      label="Add to Cart"
                      icon="i-heroicons-plus"
                      class="bg-primary text-white cursor-pointer"
                      @click="addToCart(item)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination Controls -->
          <div v-if="totalPages > 1" class="flex justify-center mt-8">
            <div class="flex space-x-2">
              <UButton
                icon="i-heroicons-chevron-left"
                color="primary"
                variant="ghost"
                class="cursor-pointer flex justify-center items-center"
                :disabled="currentPage === 1"
                @click="currentPage--"
              />
              <div class="flex space-x-1">
                <UButton
                  v-for="page in paginationRange"
                  :key="page"
                  :variant="currentPage === page ? 'solid' : 'outline'"
                  color="primary"
                  class="w-10 h-10 cursor-pointer flex justify-center items-center"
                  @click="currentPage = page"
                >
                  {{ page }}
                </UButton>
              </div>
              <UButton
                icon="i-heroicons-chevron-right"
                color="primary"
                variant="ghost"
                class="cursor-pointer"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              />
            </div>
          </div>
        </div>

        <!-- Fixed Footer with Cart Summary and Action Buttons -->
        <div
          class="border-t border-gray-200 bg-white p-4 sticky bottom-0 shadow-md"
        >
          <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div v-if="cartItems.length > 0" class="flex items-center">
              <div
                class="bg-primary/10 text-primary rounded-full px-3 py-1 mr-3 font-medium cursor-default"
              >
                {{ getTotalItems() }} items
              </div>
              <div class="font-bold text-lg">
                <span class="mr-2 cursor-default">Total:</span>
                <span class="text-primary cursor-default"
                  >{{ calculateTotal() }} EGP</span
                >
              </div>
            </div>
            <div v-else class="text-gray-500 italic cursor-default">
              Your cart is empty
            </div>

            <div class="flex gap-3 ml-auto">
              <UButton
                label="Cancel"
                variant="outline"
                color="gray"
                class="cursor-pointer px-4 py-2 border border-primary"
                @click="resetPreOrder"
              />
              <UButton
                label="Confirm Order"
                icon="i-heroicons-check"
                color="primary"
                class="cursor-pointer"
                :disabled="cartItems.length === 0"
                @click="confirmSelection"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-data"]);
const showMenu = ref(false);
const selectedCategory = ref("All");
const proceedingToNext = ref(false);
const menuItems = ref([]);
const loading = ref(false);
const error = ref(null);

// Pagination
const currentPage = ref(1);
const itemsPerPage = 6; // Show 6 items per page

// Initialize cart if not already done
if (!props.formData.cart) {
  emit("update-data", "cart", {
    items: [],
    preOrder: null,
  });
}

// Fetch menu items on component mount
onMounted(async () => {
  try {
    loading.value = true;
    const response = await useApi('/menu/getMenu', "get");
    console.log('API Response:', response); 
    if (response && response.results) {
      menuItems.value = response.results;
    }
  } catch (err) {
    console.error('Error fetching menu items:', err);
    error.value = 'Failed to load menu items';
  } finally {
    loading.value = false;
  }
});

// Watch category changes to reset pagination
watch(selectedCategory, () => {
  currentPage.value = 1;
});

// Categories for menu filtering
const categories = computed(() => {
  const all = ["All"];
  // Use menuItems from API if available
  const itemsToFilter = menuItems.value.length > 0 ? menuItems.value : [];
  const uniqueCategories = [
    ...new Set(itemsToFilter.map((item) => item.category)),
  ];
  return [...all, ...uniqueCategories].filter(Boolean);
});

// Cart items computed property
const cartItems = computed(() => {
  return props.formData.cart?.items || [];
});

// REMOVED: The meal type filtering - now we just return all menu items
// No more filtering based on mealType
const filteredMenu = computed(() => {
  return menuItems.value; // Return all menu items without meal type filtering
});

// Filter menu items by selected category
const filteredMenuByCategory = computed(() => {
  if (selectedCategory.value === "All") return filteredMenu.value;
  return filteredMenu.value.filter(
    (item) => item.category === selectedCategory.value
  );
});

// Calculate total pages for pagination
const totalPages = computed(() => {
  return Math.ceil(filteredMenuByCategory.value.length / itemsPerPage);
});

// Create pagination range (for display)
const paginationRange = computed(() => {
  const range = [];
  const maxVisible = 5; // Max number of page buttons to show
  
  if (totalPages.value <= maxVisible) {
    // Show all pages
    for (let i = 1; i <= totalPages.value; i++) {
      range.push(i);
    }
  } else {
    // Always show first page
    range.push(1);
    
    // Calculate start and end of central range
    let start = Math.max(2, currentPage.value - 1);
    let end = Math.min(totalPages.value - 1, currentPage.value + 1);
    
    // Adjust when at edges
    if (currentPage.value <= 2) {
      end = 4;
    } else if (currentPage.value >= totalPages.value - 1) {
      start = totalPages.value - 3;
    }
    
    // Add page numbers
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    // Always show last page
    if (!range.includes(totalPages.value)) {
      range.push(totalPages.value);
    }
  }
  
  return range;
});

// Get paginated menu items for current page
const paginatedMenuItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const result = filteredMenuByCategory.value.slice(startIndex, endIndex);
  console.log('Paginated items:', {
    currentPage: currentPage.value,
    startIndex,
    endIndex,
    totalItems: filteredMenuByCategory.value.length,
    showingItems: result.length,
    items: result
  });
  return result;
});

// Handle category selection
function selectCategory(category) {
  selectedCategory.value = category;
  currentPage.value = 1; // Reset to first page when changing category
}

// Enable pre-order option
function enablePreOrder() {
  emit("update-data", "cart", {
    ...props.formData.cart,
    preOrder: true,
  });
  showMenu.value = true;
}

// Disable pre-order option and show next step indication
function disablePreOrder() {
  proceedingToNext.value = true;
  emit("update-data", "cart", {
    items: [],
    preOrder: false,
  });
}

// Reset pre-order option (return to initial choice)
function resetPreOrder() {
  showMenu.value = false;
  emit("update-data", "cart", {
    items: [],
    preOrder: null,
  });
  proceedingToNext.value = false;
}

// Confirm selection and continue
function confirmSelection() {
  if (cartItems.value.length === 0) return;
  showMenu.value = false;
}

// Find an item in the cart by ID
function getCartItem(id) {
  if (!props.formData.cart?.items) return null;
  return props.formData.cart.items.find((item) => item.menuItemId === id);
}

// Add an item to the cart with the structure expected by the backend
function addToCart(item) {
  const currentCart = props.formData.cart?.items || [];
  const updatedCart = [
    ...currentCart,
    {
      menuItemId: item._id, // Use _id instead of id to match MongoDB
      name: item.name || item.title, // Use name or title, depending on what's available
      price: item.price,
      quantity: 1,
    },
  ];

  emit("update-data", "cart", {
    ...props.formData.cart,
    items: updatedCart,
    preOrder: true,
  });
}

// Increase the quantity of an item in the cart
function increaseQuantity(item) {
  const currentCart = [...props.formData.cart.items];
  const itemIndex = currentCart.findIndex(
    (cartItem) => cartItem.menuItemId === item._id
  );

  if (itemIndex !== -1) {
    currentCart[itemIndex] = {
      ...currentCart[itemIndex],
      quantity: currentCart[itemIndex].quantity + 1,
    };

    emit("update-data", "cart", {
      ...props.formData.cart,
      items: currentCart,
    });
  }
}

// Decrease the quantity of an item in the cart
function decreaseQuantity(item) {
  const currentCart = [...props.formData.cart.items];
  const itemIndex = currentCart.findIndex(
    (cartItem) => cartItem.menuItemId === item._id
  );

  if (itemIndex !== -1) {
    if (currentCart[itemIndex].quantity === 1) {
      // Remove item if quantity becomes 0
      currentCart.splice(itemIndex, 1);
    } else {
      currentCart[itemIndex] = {
        ...currentCart[itemIndex],
        quantity: currentCart[itemIndex].quantity - 1,
      };
    }

    emit("update-data", "cart", {
      ...props.formData.cart,
      items: currentCart,
    });
  }
}

// Calculate the total price of items in the cart
function calculateTotal() {
  if (!props.formData.cart?.items) return 0;
  return props.formData.cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

// Get total number of items in cart
function getTotalItems() {
  if (!props.formData.cart?.items) return 0;
  return props.formData.cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>