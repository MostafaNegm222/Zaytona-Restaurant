<script setup>
import { z } from "zod";
definePageMeta({
  layout: "auth",
  name : "Forget Password"
});

// Get router
const router = useRouter();

// State
const formState = reactive({
  email: undefined,
});
const isLoading = ref(false);
const errorMsg = ref(null);
const successMsg = ref(null);

// Schema
const schema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

const auth = useAuth();
const user = useUserStore();

async function submitEmail({ data }) {
  try {
    isLoading.value = true;
    await auth.requestPasswordReset(data.email);
    user.setEmail(data.email);
    successMsg.value = "Reset link sent to your email!";
    errorMsg.value = null;
    setTimeout(() => {
      router.push('/auth/ResetPassword');
    }, 2000);
  } catch (error) {
    errorMsg.value = error.message || "Failed to send reset link";
    successMsg.value = null;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
      <h1 class="text-xl md:text-3xl mb-6 text-center font-bold cursor-default text-dark-blue">FORGET PASSWORD</h1>
      <p class="text-lg md:text-xl text-light-dark-blue text-center">
        No worries, we've got you! Reset your password easily.      </p>
      <div class="h-[30px] mb-4">
        <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 rounded text-red-500">
          {{ errorMsg }}
        </p>
        <p
          v-if="successMsg"
          class="text-center p-2 text-sm bg-green-50 rounded text-green-500"
        >
          {{ successMsg }}
        </p>
      </div>

      <UForm v-slot="{ errors }" :state="formState" :schema="schema" class="px-[10%]" @submit="submitEmail">
        <div class="mb-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="formState.email"
              placeholder="Email"
              class="w-full text-primary border-primary rounded-lg"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-envelope"
                  class="w-5 h-5 text-primary"
                />
              </template>
            </UInput>
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">
              {{ errors.email }}
            </p>
          </UFormGroup>
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-primary text-white cursor-pointer text-lg"
          block
        >Submit
        </UButton>
      </UForm>

      <p class="mt-4 text-center text-sm cursor-default text-light-dark-blue">
        Remembered your password?
        <nuxt-link to="/auth/login" class="underline underline-offset-4 pl-1 font-semibold text-primary"
          >Sign in</nuxt-link
        >
      </p>
  </div>
</template>