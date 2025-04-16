<script setup>
const open = ref(false);
const editModalOpen = ref(false);
const addModalOpen = ref(false);
const toast = useToast();
const currentItemId = ref(null);

// Loading states for buttons
const isEditLoading = ref(false);
const isAddLoading = ref(false);

// For edit form
const editForm = ref({
  name: "",
  category: "",
  price: "",
  description: "",
  image: null,
});

// For add form
const newItem = ref({
  name: "",
  category: "",
  price: "",
  description: "",
  image: null,
});

// items select for categories
const items = ref(["dinner", "lunch", "breakfast", "drinks", "dessert"]);
const selectedCategory = ref("all"); // Default to show all items

const page = ref(1);
const itemsPerPage = 6;

const globalFilter = ref("");

const data = ref([]);

// Reset pagination when filter changes
watch([globalFilter, selectedCategory], () => {
  page.value = 1;
});

const filteredData = computed(() =>
  data.value.filter((item) => {
    const searchTerm = globalFilter.value.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.price.toString().toLowerCase().includes(searchTerm);

    // If "all" is selected or category matches the selected one
    const matchesCategory =
      selectedCategory.value === "all" ||
      item.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  })
);

const paginatedData = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  return filteredData.value.slice(start, end);
});

// Fetch menu items on component mount
onMounted(async () => {
  await fetchMenuItems();
});

const fetchMenuItems = async () => {
  try {
    const response = await useApi("/menu/getMenu", "get");
    console.log(response);
    console.log(data);

    if (response?.results) {
      data.value = response.results;
      console.log(data);
    }
  } catch (error) {
    console.error("Error fetching results:", error);
    toast.add({
      title: "Failed to load menu items",
      description: error.message || "Could not load menu items",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
};

// Open delete confirmation modal and store the current item ID
const openDeleteModal = (itemId) => {
  currentItemId.value = itemId;
  open.value = true;
};

// Handle delete item
const deleteItem = async () => {
  try {
    const response = await useApi(
      `/menu/deleteMenuItem/${currentItemId.value}`,
      "delete"
    );

    if (response && response.success) {
      toast.add({
        title: "Success",
        description: "Menu item deleted successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });

      // Refresh data after deletion
      await fetchMenuItems();
      page.value = 1;
    } else {
      throw new Error(response?.message || "Failed to delete item");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    toast.add({
      title: "Failed to delete item",
      description: error.message || "Could not delete the item",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    open.value = false;
  }
};

// Open edit modal and populate form with item data
const openEditModal = (item) => {
  // Set the form data first
  editForm.value = {
    name: item.name || "",
    category: item.category || "",
    price: item.price || "",
    description: item.description || "",
    image: null,
  };
  // Set the current item ID
  currentItemId.value = item._id;
  // Then open the modal
  editModalOpen.value = true;
};

// Handle edit item submission
const submitEditItem = async (event) => {
  // Prevent default form submission behavior
  if (event) event.preventDefault();

  // Return early if already processing
  if (isEditLoading.value) return;

  try {
    isEditLoading.value = true;

    // Validate required fields
    if (
      !editForm.value.name ||
      !editForm.value.category ||
      !editForm.value.price
    ) {
      toast.add({
        title: "Validation Error",
        description: "Please fill in all required fields",
        color: "error",
        icon: "i-lucide-alert-circle",
      });
      return;
    }

    // Create form data for submission
    const formData = new FormData();
    formData.append("name", editForm.value.name);
    formData.append("category", editForm.value.category);
    formData.append("price", editForm.value.price);
    formData.append("description", editForm.value.description || "");

    if (editForm.value.image) {
      formData.append("image", editForm.value.image);
    }

    // Debug log for formData
    console.log("Submitting edit with data:", {
      name: editForm.value.name,
      category: editForm.value.category,
      price: editForm.value.price,
      description: editForm.value.description,
    });

    const response = await useApi(
      `/menu/updateMenuItem/${currentItemId.value}`,
      "put",
      formData
    );

    if (response && response.success) {
      toast.add({
        title: "Success",
        description: "Menu item updated successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });

      // Refresh data after update
      await fetchMenuItems();

      // Explicitly close the modal
      editModalOpen.value = false;
    } else {
      throw new Error(response?.message || "Failed to update item");
    }
  } catch (error) {
    console.error("Error updating item:", error);
    toast.add({
      title: "Failed to update item",
      description: error.message || "Could not update the item",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    isEditLoading.value = false;
  }
};

// Handle add new item submission
const submitAddItem = async (event) => {
  // Prevent default form submission behavior
  if (event) event.preventDefault();

  // Return early if already processing
  if (isAddLoading.value) return;

  try {
    isAddLoading.value = true;

    // Validate required fields
    if (
      !newItem.value.name ||
      !newItem.value.category ||
      !newItem.value.price
    ) {
      toast.add({
        title: "Validation Error",
        description: "Please fill in all required fields",
        color: "error",
        icon: "i-lucide-alert-circle",
      });
      isAddLoading.value = false;
      return;
    }

    // Create form data for submission
    const formData = new FormData();
    formData.append("name", newItem.value.name);
    formData.append("category", newItem.value.category);
    formData.append("price", newItem.value.price);
    formData.append("description", newItem.value.description || "");

    if (newItem.value.image) {
      formData.append("image", newItem.value.image);
    }

    // Debug log
    console.log("Submitting new item with FormData");
    const response = await useApi("/menu/addMenu", "post", formData);

    if (response && response.success) {
      toast.add({
        title: "Success",
        description: "Menu item added successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });

      // Reset form
      newItem.value = {
        name: "",
        category: "",
        price: "",
        description: "",
        image: null,
      };

      // Refresh data after adding
      await fetchMenuItems();

      // Explicitly close the modal
      addModalOpen.value = false;
    } else {
      throw new Error(response?.message || "Failed to add item");
    }
  } catch (error) {
    console.error("Error adding item:", error);
    toast.add({
      title: "Failed to add item",
      description: error.message || "Could not add the item",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    isAddLoading.value = false;
  }
};

// Handle file uploads
const handleEditImageUpload = (event) => {
  if (event.target.files && event.target.files.length > 0) {
    editForm.value.image = event.target.files[0];
  }
};

const handleAddImageUpload = (event) => {
  if (event.target.files && event.target.files.length > 0) {
    newItem.value.image = event.target.files[0];
  }
};
</script>

<template>
  <div class="flex flex-col gap-8 w-full my-6 min-h-[80vh] md:min-h-[90vh] justify-between ">
    <div class="flex flex-col gap-8">
      <div class="flex justify-between items-center">
      <div class="flex justify-between flex-col">
        <h2 class="text-primary text-xl md:text-3xl font-bold cursor-default">Menu Items</h2>
        <p class="cursor-default">{{ filteredData.length }} Items</p>
      </div>

      <div class="flex flex-col gap-4">
        <UInput
          v-model="globalFilter"
          icon="i-lucide-search"
          class="max-w-sm"
          size="md"
          variant="outline"
          placeholder="Search..."
        />

        <UModal v-model:open="addModalOpen" title="Add New Item to Menu">
          <UButton
            label="Add New Item"
            color="neutral"
            variant="subtle"
            class="bg-primary text-white hover:text-primary cursor-pointer flex items-center justify-center"
            @click="addModalOpen = true"
          />

          <template #body>
            <div>
              <form @submit="submitAddItem">
                <div>
                  <h2 class="text-primary text-3xl font-bold">New Item</h2>
                  <p class="text-gray-500 text-xl">Add new items to menu!</p>
                </div>

                <div class="flex flex-col gap-2 my-6">
                  <UInput
                    v-model="newItem.name"
                    placeholder="Item Name"
                    type="text"
                    required
                  />
                  <UInputMenu
                    v-model="newItem.category"
                    placeholder="Item Type"
                    :items="items"
                    required
                  />
                  <UInput
                    v-model="newItem.price"
                    placeholder="Item Price"
                    type="number"
                    required
                  />
                  <UInput
                    type="file"
                    placeholder="Item Image"
                    required
                    @change="handleAddImageUpload"
                  />
                  <UTextarea
                    v-model="newItem.description"
                    placeholder="Item Description..."
                    required
                  />
                </div>

                <div class="flex flex-col md:flex-row justify-between gap-5">
                  <UButton
                    type="button"
                    class="md:text-xl text-sm px-16 cursor-pointer bg-transparent text-primary border border-primary flex items-center justify-center hover:text-white"
                    :disabled="isAddLoading"
                    @click="addModalOpen = false"
                    >Cancel</UButton
                  >
                  <UButton
                    type="submit"
                    class="md:text-xl text-sm px-16 cursor-pointer flex justify-center items-center"
                    :loading="isAddLoading"
                    :disabled="isAddLoading"
                  >
                    {{ isAddLoading ? "Saving..." : "Save Item" }}
                  </UButton>
                </div>
              </form>
            </div>
          </template>
        </UModal>
      </div>
    </div>

    <!-- Category filter bar -->
    <div class="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
      <UButton
        :class="
          selectedCategory === 'all'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        "
        class="px-4 py-2 rounded-md cursor-pointer"
        @click="selectedCategory = 'all'"
      >
        All
      </UButton>
      <UButton
        v-for="category in items"
        :key="category"
        :class="
          selectedCategory === category
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        "
        class="px-4 py-2 rounded-md cursor-pointer"
        @click="selectedCategory = category"
      >
        {{ category.charAt(0).toUpperCase() + category.slice(1) }}
      </UButton>
    </div>

    <div v-if="paginatedData.length > 0" class="flex flex-col gap-4 mt-6">
      <div
        v-for="menuItem in paginatedData"
        :key="menuItem._id"
        class="flex md:flex-row flex-col flex-wrap border border-gray-300 rounded-md items-center gap-4 p-4 justify-around"
      >
        <div class="md:w-[200px] md:h-[200px] w-[150px] h-[150px]">
          <img
            :src="menuItem.image?.secure_url"
            alt=""
            class="w-full h-full object-contain"
          >
        </div>

        <div>
          <h2 class="text-primary text-2xl font-bold cursor-default">
            {{ menuItem.name }}
          </h2>
          <div class="flex justify-between">
            <h2 class="font-semibold text-xl mt-4 cursor-default">
              {{ menuItem.category }}
            </h2>
            <h2 class="font-semibold text-xl mt-4 cursor-default">
              {{ menuItem.price }} EGP
            </h2>
          </div>
          <p
            class="mt-4 text-gray-500 cursor-default truncate whitespace-nowrap overflow-hidden text-overflow-ellipsis w-[300px] md:w-[400px]"
          >
            {{ menuItem.description }}
          </p>
        </div>

        <div class="flex justify-between gap-5">
          <!-- Edit Modal -->
          <UModal v-model:open="editModalOpen" title="Edit Menu Item">
            <UButton
              label="Edit"
              color="neutral"
              variant="subtle"
              class="bg-primary text-white hover:text-primary cursor-pointer"
              @click="openEditModal(menuItem)"
            />

            <template #body>
              <div>
                <form @submit="submitEditItem">
                  <div>
                    <h2 class="text-primary text-3xl font-bold">Edit Item</h2>
                    <p class="text-gray-500 text-xl">Edit your item in menu!</p>
                  </div>

                  <div class="flex flex-col gap-2 my-6">
                    <UInput
                      v-model="editForm.name"
                      placeholder="Item Name"
                      type="text"
                      required
                    />
                    <UInputMenu
                      v-model="editForm.category"
                      placeholder="Item Type"
                      :items="items"
                      required
                    />
                    <UInput
                      v-model="editForm.price"
                      placeholder="Item Price"
                      type="number"
                      required
                    />
                    <UInput
                      type="file"
                      placeholder="Item Image"
                      @change="handleEditImageUpload"
                    />
                    <UTextarea
                      v-model="editForm.description"
                      placeholder="Item Description..."
                      required
                    />
                  </div>

                  <div class="flex flex-col md:flex-row justify-between gap-5">
                    <UButton
                      type="button"
                      class="md:text-xl text-sm px-16 cursor-pointer bg-transparent text-primary border border-primary flex items-center justify-center hover:text-white"
                      :disabled="isEditLoading"
                      @click="editModalOpen = false"
                      >Cancel</UButton
                    >
                    <UButton
                      type="submit"
                      class="md:text-xl text-sm px-16 cursor-pointer flex justify-center items-center"
                      :loading="isEditLoading"
                      :disabled="isEditLoading"
                    >
                      {{ isEditLoading ? "Saving..." : "Save Edit" }}
                    </UButton>
                  </div>
                </form>
              </div>
            </template>
          </UModal>

          <UModal
            v-model:open="open"
            :ui="{
              content:
                'bg-transparent border-0 shadow-none rounded-none divided-none ring-transparent ',
            }"
          >
            <UButton
              class="md:text-xl text-sm cursor-pointer"
              label="Delete"
              color="neutral"
              variant="subtle"
              @click="openDeleteModal(menuItem._id)"
            >
              Delete
            </UButton>

            <template #content>
              <div
                class="bg-slate-400/10 backdrop-blur-md shadow-md p-6 lg:p-12 overflow-hidden relative rounded-tl-[30%] rounded-br-[30%] border border-slate-300 w-full flex flex-col items-center"
              >
                <p class="text-center text-xl">
                  Are you sure about deleting this item?
                </p>

                <div class="flex justify-end mt-8 gap-4">
                  <UButton
                    class="mr-2 px-2 py-1 md:px-16 md:py-2 text-sm border border-primary text-primary bg-transparent rounded cursor-pointer"
                    @click="open = false"
                  >
                    Cancel
                  </UButton>
                  <UButton
                    class="px-2 py-1 md:px-16 md:py-2 text-sm  text-white bg-red-700 rounded cursor-pointer hover:text-white"
                    @click="deleteItem"
                  >
                    Delete
                  </UButton>
                </div>
              </div>
            </template>
          </UModal>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="text-2xl text-primary text-center mt-8 font-bold">No Data to show please clean search Filed</h2>
    </div>
    </div>
    <div class="flex justify-between items-center flex-col md:flex-row gap-3">
      <div>
        <p class="text-sm text-gray-500 cursor-default">
          Showing {{ filteredData.length ? (page - 1) * itemsPerPage + 1 : 0 }}-
          {{ Math.min(page * itemsPerPage, filteredData.length) }} of
          {{ filteredData.length }}
        </p>
      </div>

      <div>
        <UPagination
          v-model="page"
          :items-per-page="itemsPerPage"
          :total="filteredData.length"
          @update:page="page = $event"
        />
      </div>
    </div>
  </div>
</template>
