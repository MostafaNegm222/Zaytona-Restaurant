<script setup>
const router = useRouter();
const route = useRoute();
const activeIcon = ref("");

const menuItems = ref([
  { title: "Profile Info", icon: "i-lucide-user", route: "/user/profile" },
  {
    title: "Edit Profile",
    icon: "i-heroicons-cog-8-tooth",
    route: "/user/profile/edit",
  },
  {
    title: "Change Password",
    icon: "i-heroicons-lock-closed",
    route: "/user/profile/ChangePassword",
  },
  {
    title: "Reservations",
    icon: "i-lucide-calendar",
    route: "/user/profile/reservations",
  },
  {
    title: "Delete Account",
    icon: "i-lucide-lock",
    route: "/user/profile/Delete",
  },
]);

watchEffect(() => {
  const currentItem = menuItems.value.find((item) => item.route === route.path);
  activeIcon.value = currentItem ? currentItem.title : "";
});

const routeToPage = (path) => {
  router.push(path).catch((err) => {
    console.error("Navigation error:", err);
  });
};
</script>

<template>
  <div
    class="flex flex-row md:flex-col gap-8 justify-between md:justify-start flex-wrap"
  >
    <div
      v-for="item in menuItems"
      :key="item.title"
      class="flex gap-6 items-center cursor-pointer md:mb-8 mb-0"
      @click="routeToPage(item.route)"
    >
      <div
        class="w-[40px] h-[40px] flex justify-center items-center rounded-[50%] transition-all"
        :class="
          activeIcon === item.title
            ? 'bg-primary text-white shadow-lg scale-110'
            : 'bg-slate-200 text-primary'
        "
      >
        <UIcon
          :name="item.icon"
          class="size-6 transition-all"
          :class="activeIcon === item.title ? 'text-white' : 'text-primary'"
        />
      </div>
      <h4
        class="text-xl transition-all"
        :class="
          activeIcon === item.title
            ? 'text-primary font-semibold'
            : 'text-gray-700'
        "
      >
        {{ item.title }}
      </h4>
    </div>
  </div>
</template>
