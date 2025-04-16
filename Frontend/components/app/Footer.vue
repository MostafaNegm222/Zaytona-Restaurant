<template>
  <footer class="bg-primary text-white py-8 hidden md:block">
    <UContainer
      class="flex flex-col md:flex-row justify-between items-center gap-10"
    >
      <div class="hidden md:hidden lg:block">
        <img
          src="../../assets/images/Logo.png"
          alt="footer image"
          class="w-[80%] lg:w-[100%] max-w-[250px]"
        >
      </div>

      <div
        class="flex gap-6 lg:gap-10 text-center md:text-left text-sm md:text-base"
      >
        <div class="flex flex-col gap-2 lg:gap-3">
          <nuxt-link to="/">Home</nuxt-link>
          <nuxt-link to="/user/Tables">Reservation</nuxt-link>
          <nuxt-link to="/user/Menu">Menu</nuxt-link>
        </div>
        <div class="flex flex-col gap-2 lg:gap-3">
          <nuxt-link to="/user/OurStory">Our Story</nuxt-link>
          <nuxt-link to="/user/ContactUs">Contact Us</nuxt-link>
        </div>
      </div>

      <div
        class="flex flex-col gap-2 lg:gap-3 text-center md:text-left text-sm md:text-base"
      >
        <p>
          Phone:
          <a href="tel:+201005066611" class="underline">+20 100 506 6611</a>
        </p>
        <p class="cursor-default">12 Nile Street, Zamalek, Cairo</p>
        <p class="cursor-default">Open daily from 08:00 AM to 12:00 AM</p>
      </div>

      <div class="flex flex-col gap-2 lg:gap-3 text-center md:text-left">
        <div class="flex gap-2 lg:gap-3 items-center">
          <Icon name="uil:facebook" class="text-white w-5 h-5 lg:w-6 lg:h-6" />
          <p class="text-sm md:text-base">Zaytona.eg</p>
        </div>
        <div class="flex gap-2 lg:gap-3 items-center">
          <Icon name="uil:instagram" class="text-white w-5 h-5 lg:w-6 lg:h-6" />
          <p class="text-sm md:text-base">Zaytona.eg</p>
        </div>
        <div class="flex gap-2 lg:gap-3 items-center">
          <Icon name="uil:envelope" class="text-white w-5 h-5 lg:w-6 lg:h-6" />
          <p class="cursor-default text-sm md:text-base">
            <a href="mailto:zaytona@gmail.com" class="underline"
              >zaytona@cusine.com</a
            >
          </p>
        </div>
      </div>

      <div
        class="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-[200px]"
      >
        <h2 class="text-white text-lg md:text-xl font-semibold">
          Stay Updated!
        </h2>
        <h6 class="text-white text-sm md:text-base">
          Get exclusive offers & news
        </h6>

        <div class="flex flex-col w-full mt-3">
          <div class="relative">
            <UInput
              placeholder="Enter your email"
              class="bg-transparent text-white border border-white rounded-lg py-2 px-3 text-sm md:text-base"
            >
              <template #leading>
                <UIcon
                  name="i-heroicons-envelope"
                  class="absolute left-6 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary"
                />
              </template>
            </UInput>
          </div>
          <button
            class="bg-white text-primary font-semibold rounded-lg py-2 px-4 mt-3 text-sm md:text-base"
          >
            Subscribe
          </button>
        </div>
      </div>
      
    </UContainer>
  </footer>

  <div
    class="bg-primary text-white text-center p-4 md:hidden flex flex-col items-center gap-3"
  >
    <nuxt-link to="/">
      <img src="../../assets/images/LOGO.png" alt="logo" class="w-20 md:w-24">
    </nuxt-link>
    <p class="text-sm md:text-base">
      &copy; {{ new Date().getFullYear() }} Zaytona. All rights reserved.
    </p>
  </div>
</template>
