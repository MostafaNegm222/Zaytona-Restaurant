<script setup lang="ts">
import shot1 from "@/assets/images/Home/shot1.png";
import shot2 from "@/assets/images/Home/shot2.png";
import shot3 from "@/assets/images/Home/shot3.png";
import shot4 from "@/assets/images/Home/shot4.png";
import shot6 from "@/assets/images/Home/shot6.png";
import shot7 from "@/assets/images/Home/shot7.png";

const items = [shot1, shot2, shot3, shot4, shot6, shot7];
</script>

<template>
  <div class="bg-[url('/assets/images/Home/Menubg.png')] bg-contain py-5">
    <UContainer>
      <div class="mt-[30px] md:mt-[50px] flex justify-between items-center">
        <h1
          class="text-lg md:text-2xl lg:text-4xl font-bold text-primary cursor-default"
        >
          Experience the Ambiance
        </h1>
        <NuxtLink
          to="/user/ContactUs"
          class="text-primary text-sm sm:text-md md:text-2xl text-center underline underline-offset-8"
        >
          Contact Us
        </NuxtLink>
      </div>
      <div class="my-[30px] md:my-[50px]">
        <UCarousel
          v-slot="{ item }"
          loop
          dots
          auto-scroll
          :items="items"
          :ui="{ item: 'basis-1/3' }"
        >
          <img
            :src="item"
            width="350"
            height="350"
            class="rounded-tl-[20%] rounded-br-[20%]"
          >
        </UCarousel>
      </div>
    </UContainer>
  </div>
</template>
