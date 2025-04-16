<template>
  <div
    class="bg-primary min-h-[60vh] sm:min-h-[70] md:min-h-[80vh] flex items-center justify-center relative"
  >
    <UContainer
      class="flex flex-col md:flex-row justify-between items-center mt-2 md:mt-4 w-full px-4 hero"
    >
      <div class="w-full text-left relative z-0 flex flex-col">
        <h1
          class="w-[100%] sm:w-[40%] md:w-[70%] lg:w-[90%] xl:w-[70%] text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight"
        >
          Experience the Art of Flavor at Zaytona
        </h1>
        <p
          class="text-base md:text-xl text-white mt-3 w-full md:w-[90%] lg:w-[70%]"
        >
          Enjoy exquisite flavors crafted with passion. Fresh ingredients,
          authentic recipes, and warm hospitality await you!
        </p>
        <div class="mt-4 flex flex-col  md:flex-row">
          <AppAuthChecker>
            <template #unAuth>
              <UButton
                to="/auth/signUp"
                class="bg-white text-primary px-6 py-3 font-semibold rounded-lg w-full md:w-auto text-[10px] md:text-base flex items-center justify-center hover:bg-primary hover:text-white hover:border hover:border-white md:mr-3 mt-3"
              >
                Sign Up Now!
              </UButton>
            </template>
          </AppAuthChecker>

          <UButton
            to="/user/tables"
            class="border border-white text-white px-6 py-3 rounded-lg w-full md:w-auto hover:bg-white hover:text-primary text-[10px] md:text-base flex items-center justify-center mt-3"
          >
            Book Your Table
          </UButton>
        </div>
      </div>

      <div class="relative w-full justify-end hidden md:block">
        <img
          src="../../assets/images/Home/Group 4.png"
          alt="hero image"
          class="w-[80%] md:w-[100%] max-w-[800px] absolute top-[0%] right-0"
        >
      </div>
    </UContainer>
  </div>
</template>
<style scoped>
@media (min-width: 768px) and (max-width: 1180px) {
  .hero img {
    width: 100% !important;
  }
}
</style>
