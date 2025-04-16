<template>
  <UContainer class="transform translate-y-[30px]">
    <slot name="steps" />
    <div class="flex items-center justify-center mx-auto my-8 mb-14">
      <img
        src="../assets/images/Auth/left.png"
        class="w-[140px] lg:w-[180px] self-end translate-x-[80px] lg:translate-x-[120px] hidden md:inline-block"
      >
      <div>
        <slot name="content" />
      </div>
      <img
        src="../assets/images/Auth/right.png"
        class="w-[180px] lg:w-[240px] self-start translate-x-[-100px] lg:translate-x-[-140px] translate-y-[-40px] hidden md:inline-block"
      >
    </div>
  </UContainer>
</template>
