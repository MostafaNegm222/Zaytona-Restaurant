<template>
  <div>
    <UContainer
      class="py-8 flex flex-col md:flex-row justify-between gap-8 md:items-center items-start"
    >
      <div>
        <h2
          class="lg:text-4xl md:text-3xl text-xl text-primary mb-6 cursor-default"
        >
          Dinner, <br>
          Events or Party?
        </h2>
        <p class="text-sm md:text-lg lg:text-xl text-primary cursor-default">
          Planning a special night out, a celebration, or a <br>
          private event? Whether it's a cozy dinner, a birthday <br>
          party, or a corporate gathering, we’ve got the perfect <br>
          space for you. Book your table now and let us make your occasion
          unforgettable!
        </p>
        <UButton
          to="/user/tables"
          class="bg-primary text-amber-50 px-6 py-3 rounded-lg duration-300 hover:border-primary hover:border flex items-center justify-center gap-2 w-auto mt-4"
        >
          Book Your Table Now!
        </UButton>
      </div>

      <div class="flex justify-center order-first md:order-0">
        <img src="../../assets/images/ourStory/img2.png" alt="image 2">
      </div>
    </UContainer>
  </div>
</template>
