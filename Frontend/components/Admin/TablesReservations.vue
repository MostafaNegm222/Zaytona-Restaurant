<script setup>
import { useToast } from "#imports";
const UBadge = resolveComponent("UBadge");
const toast = useToast();

// States for the component
const data = ref([]);
const loading = ref(true);
const table = useTemplateRef("table");
const globalFilter = ref("");
const page = ref(1);
const itemsPerPage = ref(10);
const selectedReservation = ref(null);
const detailsModalOpen = ref(false);
const confirmModalOpen = ref(false);
const actionType = ref(""); // 'confirm' or 'cancel'
const loadingDetails = ref(false);

// Fetch checkouts from API
async function fetchReservations() {
  loading.value = true;
  try {
    const response = await useApi("/admin/getCheckOut", "get");
    if (response.success) {
      console.log(response);
      data.value = response.results.map((reservation) => ({
        id: reservation._id,
        status: reservation.status || "pending",
        date: `${reservation.date} T ${
          reservation.time || "N/A"}`,
        userName: reservation.createdBy?.userName || "Guest",
        email: reservation.createdBy?.email || "N/A",
        phone: reservation.createdBy?.phoneNumberRaw || "N/A",
        fullDetails: reservation, // Store the full reservation object
      }));
    }
  } catch (error) {
    console.error("Error fetching reservations:", error);
    toast.add({
      title: "Failed to load reservations",
      description: "Could not load reservation data",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    loading.value = false;
  }
}


// Fetch single reservation by ID
async function fetchReservationById(id) {
  loadingDetails.value = true;
  try {
    const response = await useApi(`/admin/getCheckOut/${id}`, "get");
    console.log(response);
    
    if (response.success) {
      const reservation = response.checkOut;
      selectedReservation.value = {
        id: reservation._id,
        status: reservation.status || "pending",
        date: reservation.date,
        userName: reservation.createdBy?.userName || "Guest",
        email: reservation.createdBy?.email || "N/A",
        phone: reservation.createdBy?.phoneNumberRaw || "N/A",
        guests: reservation.guests,
        info: reservation.info,
        time: reservation.time,
        cart: reservation.cart,
        fullDetails: reservation,
      };
    }
  } catch (error) {
    console.error("Error fetching reservation details:", error);
    toast.add({
      title: "Failed to load details",
      description: "Could not load reservation details",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    loadingDetails.value = false;
  }
}

// Call API to update reservation status
async function updateReservationStatus(reservationId, status) {
  try {
    const response = await useApi(
      `/admin/changeCheckOutStatus/${reservationId}`,
      "patch",
      {
        status: status,
      }
    );

    if (response.success) {
      toast.add({
        title: `Reservation ${
          status === "delivered" ? "confirmed" : "cancelled"
        } successfully!`,
        color: "success",
        icon: "i-lucide-check-circle",
      });
      fetchReservations()
      // Update local data to reflect the change
      const index = data.value.findIndex((item) => item.id === reservationId);
      if (index !== -1) {
        data.value[index].status = status;
      }

      // Update selected reservation
      if (
        selectedReservation.value &&
        selectedReservation.value.id === reservationId
      ) {
        selectedReservation.value.status = status;
      }

      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating reservation:", error);
    toast.add({
      title: "Failed to update reservation",
      description: error.message || "Could not update reservation status",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
    return false;
  }
}

// Handle showing details modal
async function openDetailsModal(reservation) {
  await fetchReservationById(reservation.id);
  detailsModalOpen.value = true;
}

// Handle confirmation
async function handleConfirm() {
  if (!selectedReservation.value) return;

  const status = actionType.value === "confirm" ? "delivered" : "canceled";
  const success = await updateReservationStatus(
    selectedReservation.value.id,
    status
  );

  if (success) {
    confirmModalOpen.value = false;
    detailsModalOpen.value = false;
  }
}

const columns = [
  {
    accessorKey: "id",
    header: "#ID",
    cell: ({ row }) => `#${row.getValue("id").substring(0, 8)}...`,
  },
  {
    accessorKey: "userName",
    header: "Customer",
    cell: ({ row }) => row.getValue("userName"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      const color =
        {
          delivered: "success",
          preparing: "warning",
          pending: "info",
          canceled: "error",
        }[statusValue] || "info";

      return h(
        UBadge,
        { class: "capitalize", variant: "subtle", color },
        () => statusValue
      );
    },
  },
  {
    accessorKey: "date",
    header: "Reservation Time",
    cell: ({ row }) => {
      const dateValue = row.getValue("date");
      if (!dateValue || dateValue === "Invalid Date") return "Invalid Date";

      return dateValue.toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
  },
];

onMounted(() => {
  fetchReservations();
});
</script>

<template>
  <div class="flex flex-col gap-8 w-full my-8 mx-auto md:min-h-[90vh] min-h-[80vh] justify-between">

    <div class="flex flex-col gap-8 w-full my-8 mx-auto ">

      <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <h2 class="text-primary text-xl md:text-3xl font-bold cursor-default">
          Tables Reservation
        </h2>
        <p class="cursor-default">{{ data.length }} Reservations</p>
      </div>
      <div>
        <UInput
          v-model="globalFilter"
          icon="i-lucide-search"
          class="max-w-sm"
          size="md"
          variant="outline"
          placeholder="Search..."
        />
      </div>
    </div>

    <div>
      <UTable
        ref="table"
        v-model:global-filter="globalFilter"
        :data="data"
        :columns="columns"
        max-h="[312px]"
        sticky
        class="flex-1"
        :loading="loading"
      >
        <template #actions-cell="{ row }">
          <div class="flex items-center gap-2">
            <UModal
              v-model:open="detailsModalOpen"
              title="Reservation Details"
              :ui="{ width: 'md:max-w-2xl' }"
            >
              <UButton
                color="primary"
                variant="soft"
                size="sm"
                icon="i-lucide-eye"
                @click="openDetailsModal(row.original)"
              >
                View
              </UButton>

              <template #body>
                <div v-if="loadingDetails" class="flex justify-center py-8">
                  <UIcon
                    name="i-lucide-loader-2"
                    class="animate-spin h-8 w-8"
                  />
                </div>

                <div v-else-if="selectedReservation" class="space-y-4">
                  <div class="flex justify-between items-center mb-2">
                    <h3 class="text-xl font-semibold">
                      Reservation #{{ selectedReservation.id }}
                    </h3>
                    <UBadge
                      class="capitalize"
                      :color="
                        selectedReservation.status === 'delivered'
                          ? 'success'
                          : selectedReservation.status === 'canceled'
                          ? 'error'
                          : selectedReservation.status === 'preparing'
                          ? 'warning'
                          : 'info'
                      "
                    >
                      {{ selectedReservation.status || "pending" }}
                    </UBadge>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 class="font-medium text-gray-500">
                        Customer Information
                      </h4>
                      <div class="mt-2 space-y-2">
                        <p>
                          <span class="font-medium">Name:</span>
                          {{ selectedReservation.userName }}
                        </p>
                        <p>
                          <span class="font-medium">Email:</span>
                          {{ selectedReservation.email }}
                        </p>
                        <p>
                          <span class="font-medium">Phone:</span>
                          {{ selectedReservation.phone }}
                        </p>
                        <p>
                          <span class="font-medium">Guests:</span>
                          {{ selectedReservation.guests || 1 }}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 class="font-medium text-gray-500">
                        Reservation Details
                      </h4>
                      <div class="mt-2 space-y-2">
                        <p>
                          <span class="font-medium">Date:</span>
                          {{
                            selectedReservation.date || "N/A"
                          }}
                        </p>
                        <p>
                          <span class="font-medium">Time:</span>
                          {{
                            selectedReservation.time || "N/A"
                          }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="
                      selectedReservation.info &&
                      selectedReservation.info.message
                    "
                  >
                    <h4 class="font-medium text-gray-500">Additional Notes</h4>
                    <p class="mt-2 p-3 bg-gray-50 rounded-md">
                    Notes : {{ selectedReservation.info.message }}
                    </p>
                <div v-if="selectedReservation.cart && selectedReservation.cart.items.length > 0 && selectedReservation.cart.items[0].menu != null">
                  <h4 class="mt-2 p-3 rounded-md font-bold">
                      Cart :
                    </h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div
                        v-for="(item, index) in selectedReservation.cart.items"
                        :key="index"
                        class="p-3 bg-gray-50 rounded-md"
                      >
                        <h4 class="font-medium text-gray-500">
                          {{ item.menu?.name }}
                        </h4>
                        <p>Price: {{ item?.menu?.price }}</p>
                        <p>Quantity: {{ item?.quantity }}</p>
                      </div>
                    </div>
                </div>

                  </div>
                </div>
              </template>

              <template #footer>
                <div class=" w-full flex justify-between">
                  <UModal
                    v-model="confirmModalOpen"
                    :title="
                      actionType === 'confirm'
                        ? 'Confirm Reservation'
                        : 'Cancel Reservation'
                    "
                  >
                    <div
                      v-if="
                        selectedReservation &&
                        selectedReservation.status !== 'delivered' &&
                        selectedReservation.status !== 'canceled'
                      "
                      class=" mx-auto flex justify-between gap-8"
                    >
                      <UButton
                        color="success"
                        icon="i-lucide-check"
                        @click="
                          actionType = 'confirm';
                          confirmModalOpen = true;
                        "
                      >
                        Confirm Reservation
                      </UButton>

                      <UButton
                        color="error"
                        icon="i-lucide-x"
                        @click="
                          actionType = 'cancel';
                          confirmModalOpen = true;
                        "
                      >
                        Cancel Reservation
                      </UButton>
                    </div>

                    <template #body>
                      <p>
                        Are you sure you want to
                        {{
                          actionType === "confirm" ? "confirm" : "cancel"
                        }}
                        this reservation?
                      </p>
                      <p class="text-sm text-gray-500 mt-2">
                        This will notify the customer via WhatsApp and email.
                      </p>
                    </template>

                    <template #footer>
                      <div class="flex justify-end gap-2">
                        <UButton
                          color="gray"
                          variant="outline"
                          @click="confirmModalOpen = false"
                        >
                          Cancel
                        </UButton>
                        <UButton
                          :color="
                            actionType === 'confirm' ? 'success' : 'error'
                          "
                          @click="handleConfirm"
                        >
                          {{
                            actionType === "confirm"
                              ? "Confirm"
                              : "Cancel Reservation"
                          }}
                        </UButton>
                      </div>
                    </template>
                  </UModal>
                </div>
              </template>
            </UModal>
          </div>
        </template>

        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6">
            <div class="i-lucide-calendar-x text-4xl text-gray-400 mb-2" />
            <p>No reservations found</p>
          </div>
        </template>
      </UTable>
    </div>


    </div>

    <div class="flex justify-between items-center flex-col md:flex-row gap-3">
      <div>
        <p class="text-sm text-gray-500 cursor-default">
          Showing {{ data.length > 0 ? (page - 1) * itemsPerPage + 1 : 0 }}-{{
            Math.min(page * itemsPerPage, data.length)
          }}
          of {{ data.length }}
        </p>
      </div>

      <div>
        <UPagination
          v-model="page"
          :items-per-page="itemsPerPage"
          :total="data.length"
          @update:page="(p) => (page = p)"
        />
      </div>
    </div>

    <!-- Details Modal -->

    <!-- Confirmation Modal -->
  </div>
</template>
