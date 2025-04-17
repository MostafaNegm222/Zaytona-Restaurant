<script setup>
const auth = useAuth();
const isMenuOpen = ref(false);
const userData = useCookie("userData");

// Add body lock when menu is open
watch(isMenuOpen, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const items = [
  {
    label: "Profile",
    icon: "i-lucide-user",
    to: "/user/profile",
  },
  {
    label: "Logout",
    icon: "i-lucide-log-out",
    // to: '#',
    onSelect: () => {
      auth.logout();
    },
  },
];

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div>
    <header
    class="bg-primary text-playfair text-xl text-amber-50 fixed top-0 left-0 right-0 z-10 py-4"
  >
    <UContainer class="flex justify-between items-center">
      <div>
        <nuxt-link to="/">
          <img
            src="../../assets/images/logos/Logo.png"
            alt="logo image"
            class="w-35"
          >
        </nuxt-link>
      </div>

      <div class="hidden lg:flex gap-10 nav">
        <nuxt-link to="/" class="navigate relative">Home</nuxt-link>
        <nuxt-link to="/user/Tables" class="navigate relative">Reservation</nuxt-link>
        <nuxt-link to="/user/Menu" class="navigate relative">Menu</nuxt-link>
        <nuxt-link to="/user/OurStory" class="navigate relative">Our Story</nuxt-link>
        <nuxt-link to="/user/ContactUs" class="navigate relative">Contact Us</nuxt-link>
      </div>

      <div class="hidden lg:block">
        <appAuthChecker>
          <template #auth>
            <UDropdownMenu
              size="xl"
              :items="items"
              :content="{
                align: 'start',
              }"
              :ui="{
                content: 'w-48 cursor-pointer',
              }"
            >
              <UButton
                size="xl"
                :label="userData.userName || 'User Name'"
                icon="i-lucide-user"
                variant="outline"
                class="text-white cursor-pointer"
              />
            </UDropdownMenu>
          </template>

          <template #unAuth>
            <nuxt-link
              to="/auth/Login"
              class="relative text-primary bg-white px-4 py-2 border border-white rounded-2xl"
            >
              Sign in
            </nuxt-link>
          </template>
        </appAuthChecker>
      </div>

      <UButton
        class="block lg:hidden"
        color="white"
        variant="ghost" 
        icon="i-lucide-menu"
        @click="isMenuOpen = true"
      />
    </UContainer>
  </header>

  <!-- Overlay (separate from drawer) -->
  <transition 
    enter-active-class="transition-opacity duration-300 ease-out" 
    enter-from-class="opacity-0" 
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in" 
    leave-from-class="opacity-100" 
    leave-to-class="opacity-0"
  >
    <div 
      v-if="isMenuOpen" 
      class="fixed inset-0 z-20 bg-black/50"
      @click="closeMenu"
    />
  </transition>

  <!-- Mobile Navigation Drawer - now opens from left -->
  <transition 
    enter-active-class="transition-transform duration-300 ease-out" 
    enter-from-class="-translate-x-full" 
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in" 
    leave-from-class="translate-x-0" 
    leave-to-class="-translate-x-full"
  >
    <div
      v-if="isMenuOpen"
      class="fixed top-0 left-0 h-screen w-4/5 max-w-sm bg-primary text-white z-30 shadow-2xl"
    >
      <div class="flex flex-col p-5 h-full">
        <div class="flex justify-between items-center mb-8">
          <img
            src="../../assets/images/logos/Logo.png"
            alt="logo image"
            class="w-32"
          >
          <UButton
            color="white"
            variant="ghost"
            icon="i-lucide-x"
            class="text-white"
            @click="closeMenu"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <nuxt-link 
            to="/" 
            class="py-4 text-xl hover:bg-white/10 px-2 rounded-lg transition-colors" 
            @click="closeMenu"
          >Home</nuxt-link>
          
          <nuxt-link 
            to="/user/Tables" 
            class="py-4 text-xl hover:bg-white/10 px-2 rounded-lg transition-colors" 
            @click="closeMenu"
          >Reservation</nuxt-link>
          
          <nuxt-link 
            to="/user/Menu" 
            class="py-4 text-xl hover:bg-white/10 px-2 rounded-lg transition-colors" 
            @click="closeMenu"
          >Menu</nuxt-link>
          
          <nuxt-link 
            to="/user/OurStory" 
            class="py-4 text-xl hover:bg-white/10 px-2 rounded-lg transition-colors" 
            @click="closeMenu"
          >Our Story</nuxt-link>
          
          <nuxt-link 
            to="/user/ContactUs" 
            class="py-4 text-xl hover:bg-white/10 px-2 rounded-lg transition-colors" 
            @click="closeMenu"
          >Contact Us</nuxt-link>
          
          <nuxt-link 
            to="/user/Profile" 
            class="py-4 text-xl hover:bg-white/10 px-2 rounded-lg transition-colors" 
            @click="closeMenu"
          >Profile</nuxt-link>
        </div>

        <div class="mt-auto mb-4 border-t border-white/20 pt-4">
          <appAuthChecker>
            <template #auth>
              <button
                class="w-full py-4 text-xl flex items-center justify-center gap-2 hover:bg-white/10 rounded-lg transition-colors"
                @click="auth.logout"
              >
                <UIcon name="i-lucide-log-out" />
                Log Out
              </button>
            </template>
            <template #unAuth>
              <nuxt-link 
                to="/auth/Login" 
                class="w-full py-4 text-xl flex items-center justify-center gap-2 bg-white text-primary rounded-lg transition-colors hover:bg-white/90"
                @click="closeMenu"
              >
                <UIcon name="i-lucide-log-in" />
                Sign in
              </nuxt-link>
            </template>
          </appAuthChecker>
        </div>
      </div>
    </div>
  </transition>
  </div>
</template>

<style scoped>
.navigate {
  position: relative;
}

.navigate::after {
  bottom: -2px;
  content: "";
  display: block;
  height: 2px;
  left: 50%;
  position: absolute;
  background: #fff;
  transition: width 0.3s ease 0s, left 0.3s ease 0s;
  width: 0;
}

.navigate:hover::after {
  width: 100%;
  left: 0;
}

@media (min-width: 768px) and (max-width: 1180px) {
  .nav {
    font-size: 17px;
  }
}

.navigate.router-link-active {
  font-weight: bolder;
  width: fit-content;
  border-bottom: 2px solid #fff;
}

.py-4.router-link-active {
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>