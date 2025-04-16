<template>
    <div class="bg-primary min-h-screen flex flex-col items-center justify-center">
     <div class="bg-primary  flex flex-col items-center justify-center">
      <UContainer class="flex flex-col md:flex-row justify-between items-center w-full px-4 bg-primary">
        <div class="w-full md:w-1/2 text-left relative z-0 flex flex-col bg-primary">
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Oops! Something Went Wrong
          </h1>
          <p class="text-base md:text-xl text-white mt-3 w-full md:w-[90%] lg:w-[70%]">
            We apologize for the inconvenience. The page you're looking for might be unavailable or there was an error with your request.
          </p>
          <div class="mt-6 flex flex-col md:flex-row">
            <UButton 
              to="/"
              class="bg-white text-primary px-6 py-3 font-semibold rounded-lg w-full md:w-auto text-base flex items-center justify-center hover:bg-primary hover:text-white hover:border hover:border-white md:mr-3 mt-3"
              @click="handleError"
            >
              Back to Home
            </UButton>
            
            <UButton
              to="/user/ContactUs"
              class="border border-white text-white px-6 py-3 rounded-lg w-full md:w-auto hover:bg-white hover:text-primary text-base flex items-center justify-center mt-3"
            >
              Contact Support
            </UButton>
          </div>
        </div>
  
        <div class="relative w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
          <div class="bg-[#F6F3F0] rounded-tl-[20%] rounded-br-[20%] p-8 max-w-md">
            <h2 class="text-xl md:text-2xl font-bold text-primary mb-4">Error Details</h2>
            <div v-if="error?.statusCode === 404">
              <p class="text-dark-blue mb-3">
                Error code: <span class="font-semibold text-red-700">404</span>
              </p>
              <p class="text-dark-blue">
                Message: <span class="font-semibold text-red-700">Page not found</span>
              </p>
            </div>
            <div v-else-if="error?.statusCode === 500">
              <p class="text-dark-blue mb-3">
                Error code: <span class="font-semibold text-red-700">500</span>
              </p>
              <p class="text-dark-blue mb-3">
                Message: <span class="font-semibold text-red-700">Server error</span>
              </p>
              <p class="text-dark-blue">
                Details: <span class="font-semibold text-red-700">{{ error.cause.message }}</span>
              </p>
            </div>
            <div v-else>
              <p class="text-dark-blue mb-3">
                Error code: <span class="font-semibold text-red-700">{{ error?.statusCode || 'Unknown' }}</span>
              </p>
              <p class="text-dark-blue">
                Message: <span class="font-semibold text-red-700">{{ error?.message || "An unexpected error occurred" }}</span>
              </p>
            </div>
            <div class="mt-6 bg-slate-200/10 backdrop-blur-md shadow-lg p-4 rounded-lg border border-slate-100">
              <p class="text-light-dark-blue text-sm">
                "Don't worry! Our team is available to help you resolve any issues. In the meantime, why not explore our menu or book a table?"
              </p>
              <p class="text-right text-gray-500 mt-2">- Zaytona Team</p>
            </div>
          </div>
        </div>
      </UContainer>
     </div>
      
      <div class="bg-primary w-full py-8 mt-12">
        <UContainer class="flex flex-col md:flex-row items-center justify-between">
          <div class="flex flex-col gap-3 w-full md:w-[50%] text-left mb-6 md:mb-0">
            <h2 class="text-xl md:text-2xl font-bold text-[#F6F3F0]">
              While You're Here...
            </h2>
            <p class="text-white">
              Explore our exquisite menu, book a table, or contact us directly. We're always ready to serve you the best dining experience!
            </p>
          </div>
          
          <div class="flex gap-4 w-full md:w-auto justify-center">
            <UButton
              to="/user/menu"
              class="border border-[#F6F3F0] text-white px-4 py-2 rounded-lg hover:border-opacity-90"
            >
              View Menu
            </UButton>
            <UButton
              to="/user/tables"
              class="border border-[#F6F3F0] text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
            >
              Book Table
            </UButton>
          </div>
        </UContainer>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    name:"Error page",
    layout: false
  })
  const error = useError();
  console.log(error);
  
  function handleError() {
    // Clear the error
    clearError();
    // Navigate to home page
    navigateTo('/');
  }
  </script>