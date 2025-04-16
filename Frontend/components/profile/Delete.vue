<script setup>
const toast = useToast();
const router = useRouter();
const token = useCookie("token");
const refreshToken = useCookie("refreshToken");
const userData = useCookie("userData");
const open = ref(false);

const deleteAccount = async () => {
  try {
    const data = await useApi("/user/deleteProfile", "DELETE");
    console.log(data);
    token.value = null;
    refreshToken.value = null;
    userData.value = null;
    router.push("/auth/login");
    toast.add({
        title: "Success",
        description: "Profile Deleted successfully",
        color: "success",
        icon: "i-lucide-check-circle",
      });
  } catch (error) {
    console.error("Delete account error:", error);
    toast.add({
      title: "Can't Delete profile",
      description: error.message || "Could not delete profile",
      color: "error",
      icon: "i-lucide-alert-circle",
    });
  }
};
</script>

<template>
  <ProfileWrapper>
    <div>
      <h4 class="text-xl font-bold my-6">
        Are you sure you want to delete your account?
      </h4>
      <p class="lh-lg mb-4">
        This action is permanent and cannot be undone. You will lose access to
        all your reservations, saved preferences, and account history. If you
        proceed, all your data will be erased, and you will need to create a
        new account to use our services again. This action cannot be reversed.
        If you're sure, click "Delete My Account" below.
      </p>
      <UModal
        v-model:open="open"
        :ui="{
          content:
            'bg-slate-400/10 backdrop-blur-md shadow-md rounded-tl-[30%] rounded-br-[30%] divided-none ring-transparent ',
          overlay: 'bg-slate-100/60',
          body: 'border-0',
          header: 'border-0',
          close: 'bg-transparent text-primary'
        }"
      >
        <UButton
          class="md:text-xl text-sm px-4 block w-[80%] mx-auto md:mx-0 md:w-fit md:inline-block my-6"
          color="error"
        >
          Delete my Account
        </UButton>

        <template #body>
          <h4 class="text-center text-3xl text-red-500">
            Are you sure about Delete this Account?
          </h4>
        </template>

        <template #footer>
          <UButton label="Cancel" color="neutral" variant="outline" @click="open = false" />
          <UButton label="Delete" color="error" @click="deleteAccount" />
        </template>
      </UModal>
    </div>
  </ProfileWrapper>
</template>