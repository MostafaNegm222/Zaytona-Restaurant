<script setup>
</script>

<template>
  <div class="min-h-[100vh] flex flex-col justify-between">
    <div>
      <AppHeader />
      <div class="mt-[85px]">
        <slot/>
      </div>
    </div>
    <AppFooter />
  </div>
</template>
