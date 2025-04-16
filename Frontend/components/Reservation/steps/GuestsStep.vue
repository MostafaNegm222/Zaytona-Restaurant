
  <template>
    <div class="flex flex-col lg:flex-row items-center w-full py-8">
      <div class="px-8 lg:w-[40%]">
        <div>
          <h1 class="text-xl md:text-2xl font-bold mb-4 text-dark-blue cursor-default w-full lg:w-[70%]">
            How 
            Many Guests?
          </h1>
  
          <p class="text-gray-500 cursor-default hidden lg:block">
            Let us know the total number of guests joining you so we can prepare
            the perfect setup for your reservation!
          </p>
        </div>
        <div class="mt-7 hidden lg:block">
          <h3 class="font-bold cursor-default">Need help?</h3>
          <h4>Call +20 100 506 6611</h4>
        </div>
      </div>
  
      <USeparator color="primary" type="solid" orientation="vertical" class="h-48 hidden lg:block" />
  
      <div class="px-8 lg:w-[60%]">
        <h1 class="text-xl md:text-2xl font-bold mb-4 text-primary cursor-default">
          Total Attendance
        </h1>
  
        <div class="mt-6 flex flex-col">
          <h2 class="font-bold text-xl">How many people?</h2>
          <p>
            We welcome groups of up to 10 people.<br>
            If you have more, please call us.
          </p>
        </div>
  
        <div class="mt-8">
          <UInputNumber v-model="guestCount" :min="1" :max="10" @update:model-value="updateGuests" />
          <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
        </div>

        <div class="mt-7 flex justify-between lg:hidden">
        <h3 class="font-bold cursor-default">Need help?</h3>
        <h4>Call +20 100 506 6611</h4>
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
  
  const emit = defineEmits(["update-data"]);
  
  const guestCount = ref(props.formData.guests || 1);
  const errorMessage = ref("");
  
  watch(guestCount, (newCount) => {
    if (newCount < 1 || newCount > 10) {
      errorMessage.value = "Guests must be between 1 and 10.";
    } else {
      errorMessage.value = "";
      emit("update-data", "guests", newCount);
    }
  });
  
  function updateGuests(newCount) {
    if (newCount >= 1 && newCount <= 10) {
      guestCount.value = newCount;
    }
  }

  </script>
  