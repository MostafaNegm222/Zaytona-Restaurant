<script setup>
const router = useRouter();
const user = reactive({});

const goToEdit = () => {
  router.push("/user/profile/edit");
};

onMounted(async () => {
  try {
    const data = await useApi("/user/profile", "GET");
    Object.assign(user, data.user); // ✅ Correctly updating reactive object
  } catch (error) {
    console.error("Error loading profile:", error);
  }
});
</script>

<template>
  <div>
    <div class="mb-6 ms-0 md:ms-14 flex justify-between">
      <h2 class="text-xl md:text-3xl font-semibold">Profile Account</h2>
      <UButton class="md:text-xl text-sm" @click="goToEdit">Change Information</UButton>
    </div>
    <ProfileWrapper class="mb-6">
      <div
        class="flex mt-8 flex-col md:flex-row justify-between items-start md:items-center w-full"
      >
        <div class="flex flex-col gap-12">
          <div>
            <h4 class="text-xl font-bold">Email Address:</h4>
            <p>{{ user.email || "Unknown Email" }}</p>
          </div>
          <div>
            <h4 class="text-xl font-bold">User Name:</h4>
            <p>{{ user.userName || "Unknown Name" }}</p>
          </div>
          <div>
            <h4 class="text-xl font-bold">Phone Number:</h4>
            <p>{{ user.phoneNumber || "Unknown Number" }}</p>
          </div>
        </div>
        <div
          class="flex justify-end order-first md:order-0 mb-6 md:md-0 mx-auto md:mx-0"
        >
          <img
            src="../../assets/images/Auth/login1.png"
            alt=""
            class="w-[400px] hidden md:inline-block"
          >
        </div>
      </div>
    </ProfileWrapper>
  </div>
</template>