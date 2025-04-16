<template>
    <div class=" min-h-[100vh] flex flex-col justify-between px-4 md:px-0">
      <AppAuthHeader />
      <div class="flex items-center justify-center container mx-auto">
        <img src="../assets/images/Auth/left.png" class="w-[140px] lg:w-[180px] self-end translate-x-[80px] lg:translate-x-[120px] hidden md:inline-block">
        <div
        class="bg-slate-200/10 backdrop-blur-md shadow-lg mb-8 md:mb-12 p-6 lg:p-12 overflow-hidden relative z-2 rounded-tl-[30%] rounded-br-[30%] border border-slate-100 w-full max-w-xl flex flex-col items-center">
        <slot/>
        </div>
        <img src="../assets/images/Auth/right.png" class="w-[180px] lg:w-[240px] self-start translate-x-[-100px] lg:translate-x-[-140px] translate-y-[-40px] hidden md:inline-block">
      </div>
      <AppAuthFooter />
    </div>
  </template>