<template>
  <div class="flex flex-col md:flex-row justify-between">
    <appSideBar />
    <UContainer class="flex-1 w-full">
      <slot />
    </UContainer>
  </div>
</template>
