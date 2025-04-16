<template>
  <div class="flex flex-col lg:flex-row items-center w-full py-8">
    <div class="px-8 lg:w-[40%]">
      <div>
        <h1 class="text-xl md:text-2xl font-bold mb-4 text-dark-blue cursor-default w-full">
          Payment Method
        </h1>
        <p class="text-gray-500 cursor-default hidden lg:block">
          Choose your preferred payment method to secure your reservation.
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

    <div class="px-8 lg:w-[60%]">
      <h1 class="text-xl md:text-2xl font-bold mb-4 text-primary cursor-default">
        Payment Method
      </h1>

      <div class="mt-6 flex flex-col">
        <div>
          <p class="cursor-default">
            You can pay the required deposit online via VISA.
          </p>
          <UButton
            label="Pay using Card"
            variant="outline"
            class="mt-3 bg-primary text-white cursor-pointer hover:text-primary w-full md:w-[50%] flex items-center justify-center"
            @click="selectPayment('creditCard')"
          />
        </div>

        <div class="my-5">
          <p class="cursor-default">
            Or choose to pay offline within 24 hours to confirm your
            reservation.
          </p>

          <UButton
            class="mt-3 bg-primary text-white cursor-pointer hover:text-primary w-full md:w-[50%] flex items-center justify-center"
            label="Pay On-site"
            color="neutral"
            variant="subtle"
            @click="openModal"
          />

          <!-- Payment Modal -->
          <UModal
            v-model:open="isModalOpen"
            :ui="{
              content:
                'bg-transparent border-0 shadow-none rounded-none divided-none ring-transparent ',
            }"
          >
            <template #content>
              <div
                class="bg-slate-400/10 backdrop-blur-md shadow-md p-6 lg:p-12 rounded-tl-[30%] rounded-br-[30%] border border-slate-300 w-full flex flex-col items-center"
              >
                <h2 class="text-2xl md:text-3xl font-bold text-center mb-3">
                  Reminder
                </h2>
                <p class="text-center">
                  Since you've chosen to pay on-site, please remember to
                  complete your payment within 24 hours to confirm your
                  reservation. Thank you for choosing us!
                </p>

                <div class="flex justify-end mt-5 gap-4">
                  <UButton
                    class="mr-2 px-2 py-1 md:px-10 md:py-2 text-sm bg-transparent border border-primary text-primary rounded cursor-pointer hover:text-white"
                    @click="isModalOpen = false"
                  >
                    Cancel
                  </UButton>
                  <UButton
                    class="px-2 py-1 md:px-10 md:py-2 text-sm bg-primary text-white rounded cursor-pointer"
                    @click="confirmOnSitePayment"
                  >
                    Confirm
                  </UButton>
                </div>
              </div>
            </template>
          </UModal>
        </div>

        <div>
          <p class="cursor-default">
            The remaining balance can be settled upon arrival at the restaurant.
          </p>
        </div>
      </div>

      <!-- Selected Payment Confirmation -->
      <p v-if="selectedPaymentMethod" class="mt-4 text-green-600">
        Selected Payment: {{ paymentLabels[selectedPaymentMethod] }}
      </p>

      <div class="mt-7 flex justify-between lg:hidden">
        <h3 class="font-bold cursor-default">Need help?</h3>
        <h4>Call +20 100 506 6611</h4>
      </div>
    </div>
  </div>
</template>

<script setup>

// Props
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

// Emits
const emit = defineEmits(["update-data"]);

// Reactive state
const isModalOpen = ref(false);
const selectedPaymentMethod = ref(props.formData.paymentMethod || null);

// Payment method labels
const paymentLabels = {
  creditCard: "Credit Card",
  cash: "Pay On-site",
};

// Watch for changes and update `formData.paymentMethod`
watch(selectedPaymentMethod, (newMethod) => {
  emit("update-data", "paymentMethod", newMethod);
});

// Select payment method
function selectPayment(method) {
  selectedPaymentMethod.value = method;
}

function openModal() {
  isModalOpen.value = true;
}

function confirmOnSitePayment() {
  selectedPaymentMethod.value = "cash";
  isModalOpen.value = false;
}
</script>
