<script setup>
import { z } from "zod";
const userData = useCookie("userData");
const router = useRouter();
const toast = useToast();


// state
const formState = reactive({
  userName: "",
  phoneNumber: "",
});

// schema
const schema = z.object({
  userName: z.string().min(1, "User Name is required"),
  phoneNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number too long"),
});

// error handling
const errorMsg = reactive({
  userName: "",
  phoneNumber: "",
});
const errMsg = ref("");
const isLoading = ref(false);

async function updateUserData() {
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
    userData.value.userName = formState.userName;
    userData.value.phoneNumber = formState.phoneNumber;
    toast.add({
        title: "Success",
        description: "Profile Updated successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });
    router.push("/user/profile");
  } catch (error) {
    console.error("Update error:", error);
    errMsg.value = error.message || "An unexpected error occurred";
    toast.add({
      title: "Can't update profile",
      description: error.message || "Could not update profile",
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

// Load user data when component is mounted
onMounted(async () => {
  try {
    const data = await useApi("/user/profile", "GET");
    formState.userName = data.user.userName || "";
    formState.phoneNumber = data.user.phoneNumber || "";
  } catch (error) {
    console.error("Error loading user data:", error);
  }
});
</script>

<template>
  <div class="w-full">
    <div class="mb-6 ms-0 md:ms-14 flex justify-between">
      <h2 class="text-xl md:text-3xl font-semibold">Edit Profile</h2>
      <UButton class="text-xl" @click="goToProfile">Cancel</UButton>
    </div>
    <ProfileWrapper class="py-12">
      <UForm :state="formState" :schema="schema" class="w-[80%] mx-auto" @submit="updateUserData">
        <div class="md:mb-4 mb-6">
          <p class="text-primary md:text-xl text-lg font-semibold">User Name:</p>
          <UFormGroup label="User Name" name="userName" class="flex flex-col">
            <UInput
              v-model="formState.userName"
              placeholder="User Name"
              class="text-primary border-primary rounded-lg"
            >
              <template #leading>
                <UIcon name="i-heroicons-user" class="w-5 h-5 text-primary" />
              </template>
            </UInput>
            <p v-if="errorMsg.userName" class="text-red-500 text-sm mt-1">
              {{ errorMsg.userName }}
            </p>
          </UFormGroup>
        </div>

        <div class="md:mb-4 mb-6 md:h-[80px] h-[100px]">
          <p class="text-primary md:text-xl text-lg font-semibold">User Phone:</p>
          <UFormGroup label="Mobile Number" name="phoneNumber">
            <UInput
              v-model="formState.phoneNumber"
              placeholder="Mobile Number"
              class="w-full text-primary border-primary rounded-lg"
            >
              <template #leading>
                <UIcon name="i-heroicons-phone" class="w-5 h-5 text-primary" />
              </template>
            </UInput>
            <p v-if="errorMsg.phoneNumber" class="text-red-500 text-sm mt-1">
              {{ errorMsg.phoneNumber }}
            </p>
          </UFormGroup>
        </div>

        <UButton
          :loading="isLoading"
          type="submit"
          color="white"
          class="duration-300 bg-primary text-white cursor-pointer text-lg md:mt-4 mt-0"
          block
          @click.prevent="updateUserData"
        >
          Update Profile
        </UButton>
      </UForm>
    </ProfileWrapper>
  </div>
</template>