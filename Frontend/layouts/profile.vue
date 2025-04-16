<script setup>
import DefaultLayout from './default.vue';
</script>

<template>
  <DefaultLayout>
    <UContainer class="min-h-[80vh] py-8">
      <div class=" flex flex-col md:flex-row justify-between gap-8 mt-6">
        <ProfileSide class="w-full md:w-[20%]" />
        <USeparator
          color="primary"
          type="solid"
          orientation="vertical"
          class="h-auto hidden md:block"
        />
        <div class="w-full md:w-[80%] ">
            <slot /> 
        </div>
      </div>
    </UContainer>
  </DefaultLayout>
</template>
