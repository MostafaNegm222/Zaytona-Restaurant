<template>
  <div class="md:px-8 px-1 flex flex-col py-6">
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-center">Food Cart</h2>
      <div v-if="!formData.cart?.preOrder || !formData.cart?.items || formData.cart.items.length === 0" class="flex flex-col items-center justify-center text-center py-6">
        <img
          src="/assets/images/emptyCart.png"
          alt="Empty Cart"
          class="w-64 mb-4"
        >
        <p class="text-lg font-semibold">Your cart is empty</p>
        <p v-if="formData.cart?.preOrder === false" class="text-gray-500">You've chosen to order at the restaurant.</p>
        <p v-else class="text-gray-500">No items were added to your cart.</p>
      </div>

      <div v-else class="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 class="font-bold text-lg mb-3">Pre-ordered Items</h3>
        <div class="space-y-3">
          <div v-for="(item, index) in formData.cart.items" :key="index" class="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
            <div class="flex items-center">
              <div class="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mr-3">
                {{ item.quantity }}
              </div>
              <div>
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-sm text-gray-500">{{ item.price }} EGP each</p>
              </div>
            </div>
            <p class="font-semibold">{{ (item.price * item.quantity) }} EGP</p>
          </div>
          <div class="border-t border-gray-300 pt-3 mt-3 font-bold flex justify-between text-lg">
            <p>Total</p>
            <p class="text-primary">{{ calculateTotal() }} EGP</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <h2 class="text-2xl font-bold mb-6 cursor-default text-center">Review Your Reservation</h2>
      <div
        class="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
      >
        <!-- Header -->
        <div
          class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"
        >
          <h3 class="text-lg font-medium">Reservation Details</h3>
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
          >
            {{ formData.mealType === "breakfast" ? "Breakfast" : "Dinner" }}
          </span>
        </div>

        <!-- Content -->
        <div class="px-6 py-4 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-500">Date</p>
              <p class="font-medium">
                {{ formData.date }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Time</p>
              <p class="font-medium">{{ formData.time || "Not selected" }}</p>
            </div>
          </div>

          <hr class="border-t border-gray-200" >

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-500">Number of Guests</p>
              <p class="font-medium">{{ formData.guests }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Payment Method</p>
              <p class="font-medium flex items-center">
                <svg
                  v-if="formData.paymentMethod === 'creditCard'"
                  class="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {{ formData.paymentMethod === "creditCard" ? "Credit Card" : "Cash" }}
              </p>
            </div>
          </div>

          <hr class="border-t border-gray-200" >

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-500">Name</p>
              <p class="font-medium">
                {{ formData.info?.name || "Not provided" }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Phone Number</p>
              <p class="font-medium">
                {{ formData.info?.phone || "Not provided" }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="mt-4">
              <p class="text-sm text-gray-500">Message</p>
              <p class="font-medium">
                {{ formData.info?.message || "No message" }}
              </p>
            </div>

            <div class="mt-4">
              <p class="text-sm text-gray-500">Seating Preference</p>
              <p class="font-medium">
                {{ formData.info?.preference || "No preference" }}
              </p>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            Please confirm your reservation details above. By submitting, you
            agree to our terms and conditions.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});


function calculateTotal() {
  if (!props.formData.cart?.items) return 0;
  return props.formData.cart.items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}
</script>