<script setup>
import { z } from "zod";

definePageMeta({
  layout: "auth",
  name : "OTP"
});

// State
const formState = reactive({
  otp: "",
});
const isLoading = ref(false);
const errorMsg = ref(null);
const successMsg = ref(null);

// Schema
const schema = z.object({
  otp: z
    .string()
    .trim()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be numeric"),
});

// Auth function
const auth = useAuth();

const user = useUserStore();
const { userEmail } = storeToRefs(user);

console.log("OTP Component - Email from store:", userEmail.value);

async function submitOTP() {
  console.log("Submitting OTP with email:", userEmail.value);
  console.log("OTP value:", formState.otp);

  if (!userEmail.value) {
    errorMsg.value = "Email is required. Please go back and enter your email.";
    return;
  }
  const otpString = formState.otp.join("");
  
  try {
    isLoading.value = true;
    await auth.verifyOTP(userEmail.value, otpString);
    successMsg.value = "OTP verified successfully!";
    errorMsg.value = null;
  } catch (error) {
    errorMsg.value = error.message || "Failed to verify OTP";
    successMsg.value = null;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
      <h1
        class="text-3xl mb-6 text-center font-bold cursor-default text-dark-blue"
      >
        VERIFICATION CODE
      </h1>
      <p class="text-lg md:text-xl text-light-dark-blue text-center cursor-default">
        We have sent you a One Time Password to your email!
      </p>
      <p class="text-lg md:text-xl text-primary text-center cursor-default mt-2">
        Please Enter OTP
      </p>
      <div class="h-[30px] mb-4">
        <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 rounded">
          {{ errorMsg }}
        </p>
        <p
          v-if="successMsg"
          class="text-center p-2 text-sm bg-green-50 rounded"
        >
          {{ successMsg }}
        </p>
      </div>

      <UForm :state="formState" :schema="schema" class="px-[10%]" @submit="submitOTP">
        <div class="mb-4 flex justify-center">
          <UFormGroup label="OTP" name="otp">
            <UPinInput 
              v-model="formState.otp" 
              :length="6"
              type="number"
              class=" gap-4 bg-transparent mb-8"
              variant="outline"
              size="xl"
            />
          </UFormGroup>
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-primary text-white cursor-pointer text-lg"
          block
          @click="submitOTP"
          >Submit
        </UButton>

        <p class="mt-4 text-center text-sm cursor-default text-primary">
          Didn’t receive the code?
          <span class="underline underline-offset-4 pl-1 font-semibold">Resend OTP</span>
        </p>
      </UForm>
  </div>
</template>
