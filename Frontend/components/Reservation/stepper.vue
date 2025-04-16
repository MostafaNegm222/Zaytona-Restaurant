<template>
  <RereservationLayout>
    <!-- Custom Stepper -->
    <template #steps>
      <ol
        class="flex items-center justify-center flex-wrap lg:flex-nowrap   w-full text-sm font-medium text-center text-gray-500 sm:text-base"
      >
        <li
          v-for="(step, index) in steps"
          :key="index"
          class="flex lg:w-full items-center"
          :class="
            index < steps.length - 1
              ? 'sm:after:content-[\'\'] sm:after:w-full sm:after:h-1 sm:after:border-b sm:after:border-gray-200 sm:after:border-1 sm:after:mx-5 sm:after:inline-block'
              : ''
          "
        >
          <span
            class="flex items-center justify-center"
            :class="{
              'after:content-[\'>\'] after:mx-2 after:font-medium sm:after:hidden':
                index < steps.length - 1,
            }"
          >
            <span
              class="mr-2 flex items-center justify-center w-8 h-8 rounded-full shrink-0 border"
              :class="{
                'bg-primary text-white border-primary': currentStep === index,
                'bg-green-500 text-white border-green-500': currentStep > index,
                'bg-gray-100 text-gray-600 border-gray-300':
                  currentStep < index,
              }"
            >
              <template v-if="currentStep > index">
                <!-- Checkmark icon -->
                <svg
                  class="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </template>
              <template v-else>
                {{ index + 1 }}
              </template>
            </span>
            <span
              class="hidden sm:inline-flex sm:ml-2"
              :class="{
                'text-primary': currentStep === index,
                'text-green-500': currentStep > index,
                'text-gray-500': currentStep < index,
              }"
            >
              {{ step.title }}
            </span>
          </span>
        </li>
      </ol>
    </template>

    <template #content>
      <!-- Step Content -->      
      <div
        class="bg-slate-200/10 backdrop-blur-md shadow-lg mb-8 md:mb-12 p-2 lg:p-12 overflow-hidden relative z-2 lg:rounded-tl-[30%] lg:rounded-br-[30%] border border-slate-100 w-full"
      >
        <div>
            <component
            :is="steps[currentStep].component"
            :form-data="formData"
            @update-data="updateFormData"
          />
        </div>
        <p v-if="errorMessage" class="text-red-500 bg-red-100 p-2 rounded mb-6 text-center w-fit mx-auto">
          {{ errorMessage }}
        </p>    
        <!-- Navigation Buttons -->
        <div class="flex justify-between mb-4 me-9 mt-4">
          <button
            v-if="currentStep > 0"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 cursor-pointer flex items-center "
            @click="previousStep"
          >
            <svg
              class="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>

          <div class="ml-auto">
            <button
              v-if="currentStep < steps.length - 1"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              :disabled="!isStepValid"
              @click="nextStep"
            >
              Next
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <button
              v-if="currentStep === steps.length - 1"
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary cursor-pointer flex items-center md:mr-5 "
              @click="submitForm"
            >
              <svg
                class="w-4 h-4 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Submit
            </button>
          </div>
        </div>
 
      </div>
    </template>
  </RereservationLayout>
</template>

<script setup>
import MealTypeStep from "./steps/MealTypeStep.vue";
import DateStep from "./steps/DateStep.vue";
import GuestsStep from "./steps/GuestsStep.vue";
import InfoStep from "./steps/InfoStep.vue";
import CartStep from "./steps/CartStep.vue";
import PaymentStep from "./steps/PaymentStep.vue";
import ReviewStep from "./steps/ReviewStep.vue";
import RereservationLayout from "../../layouts/reservation";

definePageMeta({
  layout: "reservation",
});
const errorMessage = ref("")
const router = useRouter();
const currentStep = ref(0);
const formData = ref({
  mealType: null,
  date: {},
  time: null,
  guests: 1,
  info: {},
  cart: [],
  paymentMethod: null,
});

const steps = [
  { title: "Meal Type", component: MealTypeStep, required: ["mealType"] },
  { title: "Date", component: DateStep, required: ["date"] },
  { title: "Guests", component: GuestsStep, required: ["guests"] },
  { title: "User Info", component: InfoStep, required: ["info"] },
  { title: "Cart", component: CartStep, required: ["cart"] },
  { title: "Payment", component: PaymentStep, required: ["paymentMethod"] },
  { title: "Review", component: ReviewStep, required: [] },
];

const isStepValid = computed(() => {
  const requiredFields = steps[currentStep.value].required;
  return requiredFields.every((field) => {
    const value = formData.value[field];
    return value !== null && value !== undefined && value !== "";
  });
});

function updateFormData(field, value) {
  formData.value[field] = value;
}

function nextStep() {
  if (currentStep.value < steps.length - 1 && isStepValid.value) {
    currentStep.value++;
  }
}

function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

async function submitForm() {
  try {
    errorMessage.value = ""
    console.log("Submitting reservation data:", formData.value);
    console.log( typeof formData.value.date);
    const response = await useApi('/checkOut/addCheckout' ,'post' , formData.value)
    console.log(response);
    if (formData.value.paymentMethod == 'creditCard') {
      window.location.href = response.url;
    } else {
        router.push('/user/profile/reservations')
    }
  } catch (error) {
    console.error("Error submitting form:", error);

    if (error?.data?.message) {
    errorMessage.value = error.data.message;
  } else if (error?.response?.data?.message) {
    errorMessage.value = error.response.data.message;
  } else {
    errorMessage.value = "Something went wrong while submitting the form.";
  }

  }
}
</script>
