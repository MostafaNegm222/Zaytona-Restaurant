<template>
  <div class="bg-[#F6F3F0] py-10">
    <UContainer class="flex flex-col gap-10">
      <div class="hidden md:flex justify-between items-center py-3">
        <div
          class="flex justify-around items-center gap-8 text-sm md:text-base"
        >
          <p class="cursor-default">Open Daily: 8 AM - 12 AM</p>
          <p class="cursor-default">(+20) 0100 506 6611</p>
          <p
            class="underline underline-offset-4 cursor-default hidden md:block"
          >
            12 Nile Street, Zamalek, Cairo
          </p>
        </div>
        <div class="flex flex-col gap-2">
          <img
            src="../../assets/images/Home/facebooklogo.png"
            alt="Facebook"
            class="w-10 cursor-pointer"
          >
          <img
            src="../../assets/images/Home/instalogo.png"
            alt="Instagram"
            class="w-10 cursor-pointer"
          >
          <img
            src="../../assets/images/Home/tiktoklogo.png"
            alt="TikTok"
            class="w-10 cursor-pointer"
          >
        </div>
      </div>

      <div
        class="flex flex-col md:flex-row items-center justify-between  md:h-[70vh] sm:mt-10 md:mt-6 lg:mt-4"
      >
        <div class="relative flex  justify-center w-full md:w-1/2">
          <img
            src="../../assets/images/Home/reservation.png"
            alt="Dining Table"
            class="w-[80%] sm:w-[60%] md:w-[90%] lg:w-[100%] max-w-[500px] md:max-w-[600px]"
          >
        </div>

        <div
          class="flex flex-col  md:items-start  gap-4 w-full md:w-[45%] mt-8 md:mt-0"
        >
          <h1
            class="text-2xl md:text-5xl font-bold text-primary  w-[100%] lg:w-[90%] xl:w-[70%] cursor-default"
          >
            Reserve Your Table Effortlessly!
          </h1>

          <p
            class=" text-base md:text-xl text-dark-blue  w-[90%] lg:w-[60%]"
          >
            Book your table in just a few clicks! Choose your date, time, and
            preferred seating, and let us handle the rest for a perfect dining
            experience.
          </p>

          <UButton
            to="/user/tables"
            class="bg-primary text-amber-50 px-6 py-3 rounded-lg duration-300 hover:border-primary hover:border flex items-center justify-center gap-2  w-auto"
          >
            Book Your Table Now!
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>



