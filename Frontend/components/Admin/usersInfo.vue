<script setup>
const toast = useToast();
const deleteModalOpen = ref(false);
const changeRoleModalOpen = ref(false);
const selectedRole = ref("user");
const currentUserId = ref(null);
const data = ref([]);

const columns = [
  {
    accessorKey: "_id",
    header: "#ID",
    cell: ({ row }) => `#${row.getValue("_id").substring(0, 8)}...`},
  {
    accessorKey: "userName",
    header: "User Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumberRaw",
    header: "Phone Number",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    header: "Action",
    id: "action",
  },
];

const table = useTemplateRef("table");
const page = ref(1);
const itemsPerPage = ref(10);
const columnFilters = ref([
  {
    id: "email",
    value: "",
  },
]);

// Data fetching function
const fetchUsers = async () => {
  try {
    const response = await useApi("/admin/getUsers", "get");
    console.log("API Response:", response);
    selectedRole.value = "user";

    if (response?.results) {
      data.value = response.results;
      console.log("Loaded users:", data.value);
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.add({
      title: "Failed to load users",
      description: error.message || "Could not load users",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
};

const fetchAdmins = async () => {
  try {
    const response = await useApi("/admin/getAdmins", "get");
    console.log("API Response:", response);

    if (response?.results) {
      data.value = response.results;
      console.log("Loaded Admins:", data.value);
      selectedRole.value = "admin";
    }
  } catch (error) {
    console.error("Error fetching Admins:", error);
    toast.add({
      title: "Failed to load Admins",
      description: error.message || "Could not load Admins",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
};

// Call fetchUsers on component mount
onMounted(() => {
  fetchUsers();
});

// Filter function for role filtering
const filteredData = computed(() => {
  return data.value;
});

// Open delete confirmation modal
const openDeleteModal = (userId) => {
  currentUserId.value = userId;
  deleteModalOpen.value = true;
};

// Handle delete user
const deleteUser = async () => {
  try {
    const response = await useApi(
      `/admin/deleteUser/${currentUserId.value}`,
      "delete"
    );
    if (response && response.success) {
      toast.add({
        title: "Success",
        description: "User deleted successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });

      // Refresh data after deletion
      await fetchUsers();
    } else {
      throw new Error(response?.message || "Failed to delete user");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.add({
      title: "Failed to delete user",
      description: error.message || "Could not delete the user",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    deleteModalOpen.value = false;
  }
};

// Open change role modal
const openChangeRoleModal = (userId) => {
  currentUserId.value = userId;
  changeRoleModalOpen.value = true;
};

// Handle change role
const changeRole = async () => {
  try {
    const response = await useApi(`/admin/changeRole`, "patch", {
      userId: currentUserId.value,
      role: "Admin",
    });

    if (response && response.success) {
      toast.add({
        title: "Success",
        description: "User role changed to admin successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });

      // Refresh data after role change
      await fetchUsers();
    } else {
      throw new Error(response?.message || "Failed to change user role");
    }
  } catch (error) {
    console.error("Error changing user role:", error);
    toast.add({
      title: "Failed to change user role",
      description: error.message || "Could not change the user role",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    changeRoleModalOpen.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col w-full my-6 justify-between h-[80vh] md:h-[90vh]">
    <div class="gap-8 flex flex-col">
      <div class="flex justify-between items-center">
        <div class="flex justify-between flex-col">
          <h2 class="text-primary text-xl md:text-3xl font-bold cursor-default">
            {{ `${selectedRole == "user" ? "Users" : "Admins"} Information`  }} 
          </h2>
          <p class="cursor-default">
            {{
              `${filteredData.length} ${
                selectedRole == "user" ? "users" : "admins"
              }`
            }}
          </p>
        </div>

        <div>
          <UInput
            :model-value="table?.tableApi?.getColumn('email')?.getFilterValue()"
            icon="i-lucide-search"
            class="max-w-sm"
            size="md"
            variant="outline"
            placeholder="Search by email..."
            @update:model-value="
              table?.tableApi?.getColumn('email')?.setFilterValue($event)
            "
          />
        </div>
      </div>

      <!-- Role filter bar -->
      <div class="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
        <UButton
          :class="
            selectedRole === 'user'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          class="px-4 py-2 rounded-md cursor-pointer"
          @click="fetchUsers"
        >
          Regular Users
        </UButton>
        <UButton
          :class="
            selectedRole === 'admin'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          "
          class="px-4 py-2 rounded-md cursor-pointer"
          @click="fetchAdmins"
        >
          Admins
        </UButton>
      </div>

      <div class="flex flex-col">
        <div class="overflow-x-auto -mx-2 sm:mx-0">
          <div class="inline-block min-w-full py-2 align-middle sm:px-0">
            <UTable
              v-if="filteredData.length > 0"
              ref="table"
              v-model:column-filters="columnFilters"
              :data="filteredData"
              :columns="columns"
              class="min-w-full divide-y divide-gray-200"
              :ui="{
                td: { base: 'whitespace-nowrap py-3 px-2 sm:px-4 text-sm' },
                th: {
                  base: 'px-2 sm:px-4 py-3 text-left text-xs sm:text-sm font-medium',
                },
              }"
            >
              <template v-if="selectedRole == 'user'" #action-cell="{ row }">
                <div class="flex space-x-1 sm:space-x-2">
                  <UButton
                    size="xs"
                    color="primary"
                    variant="soft"
                    class="min-w-[80px] sm:min-w-auto"
                    @click="openChangeRoleModal(row.original._id)"
                  >
                    <UIcon
                      name="i-lucide-user-cog"
                      class="w-3 h-3 sm:w-4 sm:h-4"
                    />
                    <span class="sr-only sm:not-sr-only sm:ml-1"
                      >Change Role</span
                    >
                  </UButton>

                  <UButton
                    size="xs"
                    color="red"
                    variant="soft"
                    class="min-w-[60px] sm:min-w-auto"
                    @click="openDeleteModal(row.original._id)"
                  >
                    <UIcon
                      name="i-lucide-trash"
                      class="w-3 h-3 sm:w-4 sm:h-4"
                    />
                    <span class="sr-only sm:not-sr-only sm:ml-1">Delete</span>
                  </UButton>
                </div>
              </template>
            </UTable>
          </div>
        </div>

        <div
          v-if="filteredData.length === 0"
          class="py-8 text-center text-sm sm:text-base text-gray-500"
        >
          No users found. Try a different filter or refresh the page.
        </div>

        <UModal
          v-model:open="changeRoleModalOpen"
          title="Change User Role"
          :ui="{
            width: 'sm:max-w-md',
            base: 'text-sm sm:text-base',
            footer: 'justify-end',
          }"
        >
          <template #body>
            <p>
              Are you sure you want to change this user's role to admin? This
              grants additional permissions.
            </p>
          </template>
          <template #footer>
            <div class="flex justify-center gap-3">
              <UButton
                color="gray"
                variant="outline"
                @click="changeRoleModalOpen = false"
              >
                Cancel
              </UButton>
              <UButton color="primary" @click="changeRole"> Confirm </UButton>
            </div>
          </template>
        </UModal>

        <UModal
          v-model:open="deleteModalOpen"
          title="Delete user"
          :ui="{
            width: 'sm:max-w-md',
            base: 'text-sm sm:text-base',
            footer: 'justify-end',
          }"
        >
          <template #body>
            <p>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </p>
          </template>
          <template #footer>
            <div class="flex justify-center gap-3">
              <UButton
                color="gray"
                variant="outline"
                class="cursor-pointer px-4 py-2 border border-primary"
                @click="deleteModalOpen = false"
              >
                Cancel
              </UButton>
              <UButton color="red" class="px-4 py-2 bg-red-700 text-white cursor-pointer" @click="deleteUser"> Delete </UButton>
            </div>
          </template>
        </UModal>
      </div>
    </div>

    <div class="flex justify-between items-center flex-col md:flex-row gap-3">
      <div>
        <p class="text-sm text-gray-500 cursor-default">
          Showing
          {{ filteredData.length > 0 ? (page - 1) * itemsPerPage + 1 : 0 }}-{{
            Math.min(page * itemsPerPage, filteredData.length)
          }}
          of {{ filteredData.length }}
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
