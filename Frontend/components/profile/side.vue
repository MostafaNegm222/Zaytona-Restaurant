<script setup>
const router = useRouter();
const route = useRoute();
const activeIcon = ref("");
const isSelectOpen = ref(false);

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

const toggleSelect = () => {
  isSelectOpen.value = !isSelectOpen.value;
};

const selectOption = (path) => {
  routeToPage(path);
  isSelectOpen.value = false;
};

const currentItemTitle = computed(() => {
  const currentItem = menuItems.value.find((item) => item.route === route.path);
  return currentItem ? currentItem.title : 'Select Option';
});
</script>

<template>
  <!-- Desktop Sidebar (md and up) -->
 <div>
  <div class="hidden md:flex md:flex-col gap-8 justify-start">
    <div
      v-for="item in menuItems"
      :key="item.title"
      class="flex gap-6 items-center cursor-pointer mb-8"
      @click="routeToPage(item.route)"
    >
      <div
        class="w-[40px] h-[40px] flex justify-center items-center rounded-full transition-all"
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

  <!-- Mobile Dropdown (xs to sm) -->
  <div class="md:hidden w-full relative">
    <div 
    class="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white cursor-pointer"
      @click="toggleSelect" 
    >
      <div class="flex items-center gap-3">
        <div
          class="w-[30px] h-[30px] flex justify-center items-center rounded-full bg-primary text-white"
        >
          <UIcon
            :name="menuItems.find(item => item.title === activeIcon)?.icon || 'i-lucide-user'"
            class="size-5"
          />
        </div>
        <span class="font-medium">{{ currentItemTitle }}</span>
      </div>
      <UIcon 
        :name="isSelectOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" 
        class="size-5 text-gray-600" 
      />
    </div>
    
    <!-- Dropdown Menu -->
    <div 
      v-if="isSelectOpen" 
      class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
    >
      <div
        v-for="item in menuItems"
        :key="item.title"
        class="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100"
        @click="selectOption(item.route)"
      >
        <div
          class="w-[30px] h-[30px] flex justify-center items-center rounded-full"
          :class="activeIcon === item.title ? 'bg-primary text-white' : 'bg-slate-200 text-primary'"
        >
          <UIcon :name="item.icon" class="size-5" />
        </div>
        <span 
          :class="activeIcon === item.title ? 'font-semibold text-primary' : 'text-gray-700'"
        >
          {{ item.title }}
        </span>
      </div>
    </div>
  </div>
 </div>
</template>