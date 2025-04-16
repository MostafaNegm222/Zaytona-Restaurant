<template>
  <div class="flex flex-col lg:flex-row items-center w-full py-8">
    <div class="px-8 lg:w-[40%]">
      <div>
        <h1 class="text-xl md:text-2xl font-bold mb-4 text-dark-blue cursor-default w-full lg:w-[60%]">
          Select 
          Date and Time
        </h1>

        <p class="text-gray-500 cursor-default hidden md:block">
          Please select date and time for your appointment.
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
      <h1 class="text-xl md:text-2xl font-bold mb-4 text-primary cursor-default">
        Date and Time
      </h1>

      <div class="mt-6 flex flex-col">
        <UCalendar v-model="selectedDate" @update:model-value="updateDate" />
      </div>

      <div class="mt-6">
        <h2 class="text-2xl font-bold mb-6">Select Time</h2>

        <div v-if="availableTimes.length > 0" class="flex flex-wrap gap-3 my-6">
          <button
            v-for="time in availableTimes"
            :key="time"
            class="py-2 px-4 rounded-md text-base cursor-pointer transition-colors"
            :class="
              formData.time === time
                ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                : 'bg-gray-100 text-gray-800 border-2 border-gray-300 hover:border-blue-300'
            "
            @click="selectTime(time)"
          >
            {{ time }}
          </button>
        </div>

        <div
          v-else
          class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mb-4"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <!-- Warning icon -->
              <svg
                class="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-yellow-700">
                Please select a meal type first
              </p>
            </div>
          </div>
        </div>

        <p v-if="formData.time" class="text-blue-600 text-sm mt-4">
          Selected time: {{ formData.time }}
        </p>
      </div>

      <div class="mt-7 flex justify-between lg:hidden">
        <h3 class="font-bold cursor-default">Need help?</h3>
        <h4>Call +20 100 506 6611</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CalendarDate } from "@internationalized/date";
const emit = defineEmits(["update-data"]);
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

// Initialize selectedDate with current date
const today = new Date();
const selectedDate = ref(
  new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
);

// Update formData.date when selectedDate changes
watch(selectedDate, (newDate) => {
  const jsDate = new Date(newDate.year, newDate.month - 1, newDate.day).toDateString();
  emit("update-data", "date", jsDate);

});

onMounted(() => {
  emit("update-data", "date", selectedDate.value);
  const jsDate = new Date(selectedDate.value.year, selectedDate.value.month - 1, selectedDate.value.day).toDateString();
  emit("update-data", "date", jsDate);
});

// Emit the updated date
watch(selectedDate, (newDate) => {
  const jsDate = new Date(newDate.year, newDate.month - 1, newDate.day).toDateString();
  emit("update-data", "date", jsDate);
});


const availableTimes = computed(() => {
  // Different time slots based on meal type
  if (props.formData.mealType === "breakfast") {
    return ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"];
  } else if (props.formData.mealType === "dinner") {
    return ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];
  }
  return [];
});

function selectTime(time) {
  emit("update-data", "time", time);
}
</script>
