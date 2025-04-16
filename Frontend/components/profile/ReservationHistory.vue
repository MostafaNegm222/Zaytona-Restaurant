<script setup>


const reservations = ref([])
const cancelingId = ref(null)
const selectedReservation = ref(null)
const toast = useToast()
const open= ref(false);
const fetchReservations = async () => {
  try {
    const response = await useApi('/checkOut/getCheckOut', 'get')
    console.log(response);
    if (response?.success && response?.results) {
      reservations.value = response.results.map(res => ({
        ...res,
        status: res.status,
        mealType: res.mealType?.charAt(0).toUpperCase() + res.mealType?.slice(1) || 'Unknown',
      }))
    }
  } catch (error) {
    console.error('Error fetching reservations:', error)
    toast.add({ title: 'Failed to load reservations', color: 'red' })
  }
}

onMounted(fetchReservations)

const cancelReservation = async () => {
  if (!selectedReservation.value) return
  cancelingId.value = selectedReservation.value._id
  try {
    const response = await useApi(`/checkOut/cancelCheckOut/${cancelingId.value}`, 'delete')
    if (response?.success) {
      reservations.value = reservations.value.filter(res => res._id !== cancelingId.value)
      toast.add({ title: 'Reservation cancelled', color: 'green' })
      open.value =false
    } else {
      toast.add({ title: 'Failed to cancel reservation', color: 'red' })
    }
  } catch (error) {
    console.error('Error cancelling reservation:', error)
    toast.add({ title: 'Error cancelling reservation', color: 'red' })
  } finally {
    selectedReservation.value = null
    cancelingId.value = null
  }
}

</script>

<template>
  <div class="mb-6 ms-0 md:ms-14 flex justify-between">
    <h2 class="text-xl md:text-3xl font-semibold">Reservations</h2>
    <UButton class="md:text-xl text-sm">
      <nuxt-link to="/user/tables">Reserve Table</nuxt-link>
    </UButton>
  </div>

  <div v-if="reservations.length === 0" class="text-center py-8">
    <p class="text-lg">You don't have any reservations yet.</p>
  </div>

  <TransitionGroup name="fade" tag="div">
    <ProfileWrapper
      v-for="(reservation,index) in reservations"
      :key="index"
      class="flex flex-col rounded-lg mb-4 transition-all duration-300 ease-in-out transform"
    >
      <h2 class="text-xl md:text-2xl font-bold text-center">Reservation Summary</h2>
      <h4 class="text-center my-2">Guest Name</h4>
      <h3 class="text-center font-bold text-lg md:text-xl">
        {{ reservation.createdBy.userName || "Unknown Name" }}
      </h3>

      <div class="my-4 w-[80%] mx-auto">
        <div class="flex justify-between items-center">
          <h2 class="font-bold md:text-lg">Status:</h2>
          <span
            :class="{
              'text-yellow-500': reservation.status === 'pending',
              'text-green-500': reservation.status === 'delivered',
              'text-red-500': reservation.status === 'canceled',
              'font-bold md:text-lg': true
            }"
          >
            {{ reservation.status || "Unknown Status" }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <h2 class="font-bold md:text-lg">Reservation Date:</h2>
          <span class="md:text-lg">
            {{ reservation.date || "not selected" }}
          </span>
        </div>
        <div class="flex justify-between items-center">
          <h2 class="font-bold md:text-lg">Meal Type:</h2>
          <span class="md:text-lg">{{ reservation.mealType || "Unknown Type" }}</span>
        </div>
        <div class="flex justify-between items-center">
          <h2 class="font-bold md:text-lg">Reservation Time:</h2>
          <span class="md:text-lg">{{ reservation.time || "Unknown Time" }}</span>
        </div>
        <div class="flex justify-between items-center">
          <h2 class="font-bold md:text-lg">Table Setting:</h2>
          <span class="md:text-lg">{{ reservation.info?.preference || "Standard" }}</span>
        </div>
        <div class="flex justify-between items-center">
          <h2 class="font-bold md:text-lg">Table For:</h2>
          <span class="md:text-lg">
            {{ reservation.guests > 1 ? `${reservation.guests} Guests` : '1 Guest' }}
          </span>
        </div>
        <div class="flex justify-between items-center">
          <h2 class="font-bold md:text-lg">Payment Method</h2>
          <span class="md:text-lg">
            {{ reservation.paymentMethod }}
          </span>
        </div>
        <div class="flex justify-between items-center">
          <h2 class="font-bold md:text-lg">reservation For Guest:</h2>
          <span class="md:text-lg">
            {{ reservation.info.name == reservation.createdBy.userName ? `Same Guest` : reservation.info.name }}
          </span>
        </div>
        <div class="flex justify-between items-center">
          <h2 class="font-bold md:text-lg">Guest Phone for Contact:</h2>
          <span class="md:text-lg">
            {{ reservation.info.phone ? reservation.info.phone : reservation.createdBy.phoneNumberRaw || "Not Provide"}} 
          </span>
        </div>
      </div>
      
      <UModal
      v-model:open="open"
      :ui="{
        content:
          'bg-transparent border-0 shadow-none rounded-none divided-none ring-transparent ',
      }"
    >
      <UButton
      v-if="reservation.status == 'pending' "
      class="bg-primary text-white px-4 py-2 mt-5 rounded cursor-pointer mx-auto hover:bg-primary"
        label="Open"
        color="neutral"
        variant="subtle"
        @click="() => {
          open = true;
          selectedReservation = reservation
        }"
      >
        Cancel Reservation
      </UButton>

      <template #content>
        <div
          class="bg-slate-400/10 backdrop-blur-md shadow-md p-6 lg:p-12 overflow-hidden relative rounded-tl-[30%] rounded-br-[30%] border border-slate-300 w-full flex flex-col items-center"
        >
          <h2 class="text-xl md:text-2xl font-bold text-center">Reservation Summary</h2>
          <h4 class="text-center text-lg">Guest Name</h4>
          <h3 class="text-center font-bold text-xl md:text-2xl mb-2">{{ reservation.createdBy.userName }}</h3>
          <p class="text-center text-xl">
            Are you sure about canceling your reservation?
          </p>

          <div class="flex justify-end mt-5 gap-4">
            <UButton
              class="mr-2 px-2 py-1 md:px-4 md:py-2 text-sm bg-primary text-white rounded cursor-pointer"
              @click="open = false"
            >
              No, keep this reservation
            </UButton>
            <UButton
              class="px-2 py-1 md:px-4 md:py-2 text-sm bg-red-500 text-white rounded cursor-pointer"
              @click="cancelReservation(selectedReservation._id)"
            >
              Yes, cancel this reservation
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
    
    </ProfileWrapper>
  </TransitionGroup>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
