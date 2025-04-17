<template>
  <div>
    <!-- Desktop Sidebar -->
  <div
    class="sidebar bg-primary text-white h-screen sticky top-0 hidden md:block overflow-hidden transition-all duration-300"
  >
    <div class="logo text-center py-8 px-0 border-b border-white/20">
      <img
        :src="logo"
        alt="logo"
        class="w-20 md:w-32 mx-auto"
      >
    </div>

    <div class="flex flex-col h-[80vh] justify-between">
      <div>
        <ul class="second-nav list-none p-0 m-0">
          <li 
          v-for="(item, index) in navItems" :key="index"
            class="nav-item relative py-4 px-6 my-2 mx-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/20 hover:translate-x-2"
          >
            <nuxt-link :to="item.path" class="inline-flex items-center gap-4">
              <UIcon :name="item.icon" class="text-2xl" />
              <span
                class="text-base font-medium opacity-80 transition-opacity duration-300 hover:opacity-100"
              >{{ item.title }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <div class="mt-auto">
        <ul class="second-nav list-none p-0">
          <li
            class="nav-item relative py-4 px-6 my-2 mx-4 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/20 hover:translate-x-2"
          >
            <a
              href="#"
              class="inline-flex items-center gap-4"
              @click.prevent="handleLogout"
            >
              <UIcon name="i-lucide-log-out" class="text-2xl" />
              <span
                class="text-base font-medium opacity-80 transition-opacity duration-300 hover:opacity-100"
              >Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Mobile Header with Drawer -->
  <div class="w-full md:hidden bg-primary">
    <UContainer class="py-4">
      <div class="flex justify-between items-center">
        <div>
          <img :src="logo" alt="logo" class="w-24" >
        </div>
        <div>
          <UButton
            color="white" 
            variant="ghost"
            icon="i-lucide-menu"
            class="text-white hover:bg-white/10"
            @click="openDrawer"
          />
        </div>
      </div>
    </UContainer>
    
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
        v-if="isDrawerOpen" 
        class="fixed inset-0 z-40 bg-black/50"
        @click="closeDrawer"
      />
    </transition>
    
    <!-- Mobile Navigation Drawer (separate from overlay) -->
    <transition 
      enter-active-class="transition-transform duration-300 ease-out" 
      enter-from-class="-translate-x-full" 
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300 ease-in" 
      leave-from-class="translate-x-0" 
      leave-to-class="-translate-x-full"
    >
      <div 
        v-if="isDrawerOpen" 
        class="fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-primary text-white h-full overflow-y-auto shadow-lg"
      >
        <div class="p-4 flex justify-between items-center border-b border-white/20">
          <img :src="logo" alt="logo" class="w-20" >
          <UButton
            color="white" 
            variant="ghost"
            icon="i-lucide-x"
            class="text-white hover:bg-white/10"
            @click="closeDrawer"
          />
        </div>
        
        <div class="flex flex-col h-[calc(100%-80px)] justify-between p-2">
          <div>
            <ul class="list-none p-0 m-0">
              <li 
                v-for="(item, index) in navItems" :key="index"
                class="nav-item relative py-4 px-4 my-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/20"
              >
                <nuxt-link :to="item.path" class="inline-flex items-center gap-4" @click="closeDrawer">
                  <UIcon :name="item.icon" class="text-2xl" />
                  <span class="text-lg font-medium">{{ item.title }}</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
          
          <div class="mt-auto mb-8">
            <ul class="list-none p-0">
              <li
                class="nav-item relative py-4 px-4 my-2 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/20"
              >
                <a
                  href="#"
                  class="inline-flex items-center gap-4"
                  @click.prevent="handleLogout"
                >
                  <UIcon name="i-lucide-log-out" class="text-2xl" />
                  <span class="text-lg font-medium">Log Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
  </div>
</template>

<script setup>
import logo from '../../assets/images/logos/Logo.png'
const auth = useAuth();
const isDrawerOpen = ref(false);

// Navigation items with Nuxt UI icon names
const navItems = [
  {
    title: 'Menu Items',
    path: '/admin',
    icon: 'i-lucide-clipboard-list'
  },
  {
    title: 'Users Information',
    path: '/admin/Users',
    icon: 'i-lucide-users'
  },
  {
    title: 'Tables Reservation',
    path: '/admin/Tables',
    icon: 'i-lucide-table'
  }
];

const openDrawer = () => {
  isDrawerOpen.value = true;
  // Prevent body scrolling when drawer is open
  document.body.style.overflow = 'hidden';
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
  // Restore body scrolling when drawer is closed
  document.body.style.overflow = '';
};

const handleLogout = () => {
  auth.logout();
  closeDrawer();
  console.log('logout');
};
</script>

<style scoped>
.sidebar {
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.nav-item {
  position: relative;
  overflow: hidden;
}

.nav-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: #fff;
  transform: scaleY(0);
  transition: transform 0.3s ease-in-out;
  border-radius: 0 2px 2px 0;
}

.nav-item:hover::before {
  transform: scaleY(1);
}

.nav-item .router-link-exact-active {
  font-weight: bold;
}

.nav-item .router-link-exact-active span {
  opacity: 1 !important;
  font-weight: 600;
}
</style>