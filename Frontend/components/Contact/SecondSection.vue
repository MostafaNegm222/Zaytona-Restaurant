<template>
  <div
    class="bg-[url('/assets/images/Home/Reviewsbg.png')] bg-contain min-h-[50vh] md:min-h-[70vh]"
  >
    <UContainer
      class="my-4 md:pt-[10%] flex flex-col md:flex-row justify-center gap-2 md:gap-4 items-center"
    >
      <div
        class="bg-slate-200/10 backdrop-blur-md shadow-lg p-4 lg:p-8 rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full max-w-xl flex flex-col"
      >
        <h2
          class="font-bold text-[1.3rem] md:text-2xl text-primary text-center cursor-default"
        >
          Breakfast Time
        </h2>
        <p class="text-center cursor-default">All days of the week</p>
        <p class="text-center cursor-default">08:00 AM - 11:30 AM</p>
      </div>
      <div
        class="bg-slate-200/10 backdrop-blur-md shadow-lg p-4 lg:p-8 rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full max-w-xl flex flex-col"
      >
        <h2
          class="font-bold text-[1.3rem] text-primary text-center md:text-3xl cursor-default"
        >
          Contact Information
        </h2>
        <p class="text-center cursor-default">12 Nile St., Zamalek Cairo</p>
        <p class="text-center cursor-default">Email: zaytona@cuzine.com</p>
        <p class="text-center cursor-default">
          Phone Number: (+20) 100 506 6611
        </p>
      </div>
      <div
        class="bg-slate-200/10 backdrop-blur-md shadow-lg p-4 lg:p-8 rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full max-w-xl flex flex-col"
      >
        <h2
          class="text-center font-bold text-[1.3rem] text-primary md:text-2xl cursor-default"
        >
          Dinner Time
        </h2>
        <p class="text-center cursor-default">All days of the week</p>
        <p class="text-center cursor-default">12:00 PM - 12:00 AM</p>
      </div>
    </UContainer>
  </div>

  <div>
    <UContainer
      class="py-8 flex flex-col md:flex-row justify-between gap-8 md:items-center items-start"
    >
      <div>
        <h2
          class="lg:text-4xl md:text-3xl text-xl text-primary mb-6 cursor-default"
        >
          Stay Connected with Us!
        </h2>
        <p class="text-sm md:text-lg lg:text-xl text-primary cursor-default">
          Don't miss out on our latest updates, special offers, and delicious
          <br>
          new dishes! Follow us on social media and be part of the Zaytona
          <br>
          family. Join the conversation, share your moments, and let’s celebrate
          <br>
          great food together!
        </p>
      </div>

      <div class="flex justify-center md:justify-end order-first md:order-0">
        <img
          src="../../assets/images/contact/img2.png"
          alt="image 1"
          class="w-[80%]"
        >
      </div>
    </UContainer>
  </div>

  <div class="bg-cream">
    <UContainer
      class="py-8 flex flex-col md:flex-row justify-between gap-8 md:items-center items-start"
    >
      <div class="flex justify-center md:justify-start">
        <img
          src="../../assets/images/contact/img1.png"
          alt="image 2"
          class="w-[80%]"
        >
      </div>
      <div>
        <h2
          class="lg:text-4xl md:text-3xl text-xl text-primary mb-6 cursor-default"
        >
          Join Us on Instagram!
        </h2>
        <p class="text-sm md:text-lg lg:text-xl text-primary cursor-default">
          Get a taste of Zaytona wherever you are! Follow us on Instagram for
          <br>
          mouthwatering food shots, behind-the-scenes moments, and exclusive
          <br>
          updates. Tag us in your photos and share your dining experience with
          <br>
          #ZaytonaEats. We can't wait to see your favorite dishes!
        </p>
      </div>
    </UContainer>
  </div>
</template>
