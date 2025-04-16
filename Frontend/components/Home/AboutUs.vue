<template>
  <div class="bg-[#F6F3F0] py-5 md:py-10">
    <UContainer
      class="flex flex-col md:flex-row items-center justify-between min-h-[30vh] md:min-h-[50vh] px-3"
    >
      <div class="flex flex-col gap-3 w-full md:w-[45%] text-left">
        <h1
          class="text-2xl md:text-5xl font-bold text-primary cursor-defau w-[100%] lg:w-[90%] xl:w-[70%] cursor-default"
        >
          The Heart Behind Our Flavor
        </h1>

        <p
          class="text-base md:text-xl text-dark-blue w-[90%] sm:w-[100%] lg:w-[95%] xl:w-[80%]"
        >
          At Zaytona, we believe dining is more than just a meal—it’s an
          experience. With fresh ingredients, rich flavors, and warm
          hospitality, we bring people together over great food. Whether you're
          here for a casual bite or a special celebration, we’re dedicated to
          making every visit unforgettable. Join us and savor the perfect blend
          of tradition and quality!
        </p>

        <NuxtLink
          to="/user/OurStory"
          class="text-primary text-lg md:text-xl mt-2 md:mt-4 mx-auto md:mx-0 underline underline-offset-8 "
        >
          View More Details About Us
        </NuxtLink>
      </div>

      <div class="hidden md:flex justify-center w-[50%]">
        <img
          src="../../assets/images/Home/aboutUs.png"
          alt="Dining Table"
          class="w-[85%] sm:w-[75%] md:w-[85%] lg:w-[90%] max-w-[400px] md:max-w-[600px]"
        >
      </div>
    </UContainer>
  </div>
</template>
