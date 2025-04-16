<script setup>
import { z } from "zod";
const toast = useToast();
const router = useRouter();

// state
const formState = reactive({
  password: "",
  confirmPassword: "",
});

// schema
const schema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        "Password must be 8-16 chars, including A-Z, a-z, 0-9, special char, no spaces"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// error handling
const errorMsg = reactive({
  password: "",
  confirmPassword: "",
});
const errMsg = ref("");
const isLoading = ref(false);
const ispasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

async function changePassword() {
  try {
    isLoading.value = true;
    Object.keys(errorMsg).forEach((key) => (errorMsg[key] = null));
    errMsg.value = null;

    const result = schema.safeParse(formState);
    if (!result.success) {
      result.error.errors.forEach((e) => {
        errorMsg[e.path[0]] = e.message;
      });
      return;
    }
    
    await useApi('/user/updateProfile', "PATCH", formState);
    // Reset form after successful password change
    Object.keys(formState).forEach(key => formState[key] = "");
    // Show success message or redirect
    toast.add({
        title: "Success",
        description: "Password change successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });
      router.push("/user/profile");
  } catch (error) {
    console.error("Password change error:", error);
    errMsg.value = error.message || "An unexpected error occurred";
    toast.add({
      title: "Failed change password",
      description: error.message || "Could not change Password",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  } finally {
    isLoading.value = false;
  }
}

const goToProfile = () => {
  router.push('/user/profile');
}
</script>

<template>
  <div class="w-full">
    <div class="mb-6 ms-0 md:ms-14 flex justify-between">
      <h2 class="text-xl md:text-3xl font-semibold">Change Password</h2>
      <UButton class="text-xl" @click="goToProfile">Cancel</UButton>
    </div>
    <ProfileWrapper class="py-12">
      <UForm :state="formState" :schema="schema" class="w-[80%] mx-auto" @submit="changePassword">
        <div class="md:mb-4 mb-6 md:h-[80px] h-[100px]">
          <p class="text-primary md:text-xl text-lg font-semibold">New Password:</p>
          <UFormGroup label="New Password" name="password">
            <UInput
              v-model="formState.password"
              :type="ispasswordVisible ? 'text' : 'password'"
              placeholder="New Password"
              class="w-full text-primary border-primary rounded-lg"
            >
              <template #leading>
                <UIcon name="i-heroicons-lock-open" class="w-5 h-5 text-primary" />
              </template>
              <template #trailing>
                <UIcon
                  :name="ispasswordVisible ? 'i-heroicons-eye-off' : 'i-heroicons-eye'"
                  class="w-5 h-5 text-primary cursor-pointer"
                  @click="ispasswordVisible = !ispasswordVisible"
                />
              </template>
            </UInput>
            <p v-if="errorMsg.password" class="text-red-500 text-sm mt-1">
              {{ errorMsg.password }}
            </p>
          </UFormGroup>
        </div>

        <div class="md:mb-4 mb-6 md:h-[80px] h-[100px]">
          <p class="text-primary md:text-xl text-lg font-semibold">Confirm New Password:</p>
          <UFormGroup label="Confirm New Password" name="confirmPassword">
            <UInput
              v-model="formState.confirmPassword"
              :type="isConfirmPasswordVisible ? 'text' : 'password'"
              placeholder="Confirm New Password"
              class="w-full text-primary border-primary rounded-lg"
            >
              <template #leading>
                <UIcon name="i-heroicons-lock-closed" class="w-5 h-5 text-primary" />
              </template>
              <template #trailing>
                <UIcon
                  :name="isConfirmPasswordVisible ? 'i-heroicons-eye-off' : 'i-heroicons-eye'"
                  class="w-5 h-5 text-primary cursor-pointer"
                  @click="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </template>
            </UInput>
            <p v-if="errorMsg.confirmPassword" class="text-red-500 text-sm mt-1">
              {{ errorMsg.confirmPassword }}
            </p>
          </UFormGroup>
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-primary text-white cursor-pointer text-lg md:mt-4 mt-0"
          block
          @click.prevent="changePassword"
        >
          Update Password
        </UButton>
      </UForm>
    </ProfileWrapper>
  </div>
</template>