<template>
  <div class="flex flex-col lg:flex-row items-center w-full py-8">
    <div class="px-8 lg:w-[40%]">
      <div>
        <h1
          class="text-xl md:text-2xl font-bold mb-4 text-dark-blue cursor-default w-full"
        >
          Review Your Reservation Details
        </h1>

        <p class="text-gray-500 cursor-default hidden lg:block">
          Please confirm your reservation information below. If you need to make
          any changes, you can update them before proceeding.
          If you don't want to fill this press <strong>Next</strong> 
        </p>
      </div>
      <div class="mt-7 hidden lg:block">
        <h3 class="font-bold cursor-default">Need help?</h3>
        <h4>Call +20 100 506 6611</h4>
      </div>
    </div>

    <USeparator
      color="primary"
      type="solid"
      orientation="vertical"
      class="h-48 hidden lg:block"
    />

    <div class="w-full px-8 lg:w-[60%]">
      <h1
        class="text-xl md:text-2xl font-bold mb-4 text-primary cursor-default"
      >
        Reservation Information <br>
        <span class="text-lg md:text-xl">(Additional Notes)</span>
      </h1>

      <div class="mt-6 flex flex-col gap-3">
        <div class="flex flex-col">
          <label class="text-gray-500 text-sm mb-1"> User Name </label>
          <UInput
            v-model="formDataLocal.name"
            
            placeholder="User Name"
            @update:model-value="updateField('name', $event)"
          >
            <template #leading>
              <UIcon name="i-mdi-account" class="text-dark-blue w-5 h-5" />
            </template>
          </UInput>
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm mb-1"> Phone Number </label>
          <UInput
            v-model="formDataLocal.phone"
            placeholder="Phone Number"
            @update:model-value="updateField('phone', $event)"
          >
            <template #leading>
              <UIcon name="i-mdi-phone" class="text-dark-blue w-5 h-5" />
            </template>
          </UInput>
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm flex items-center gap-2">
            Notes
          </label>
          <UTextarea
            v-model="formDataLocal.message"
            placeholder="Type something..."
            @update:model-value="updateField('message', $event)"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-500 text-sm flex items-center gap-2">
            Prefer Setting
          </label>
          <USelect
            v-model="formDataLocal.preference"
            :items="items"
            placeholder="Indoor / Outdoor"
            class="w-full"
            @update:model-value="updateField('preference', $event)"
          />
        </div>
      </div>

      <div class="mt-7 flex justify-between lg:hidden">
        <h3 class="font-bold cursor-default">Need help?</h3>
        <h4>Call +20 100 506 6611</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-data"]);

const items = ref(["Indoor", "Outdoor"]);

const formDataLocal = reactive({
  name: props.formData.name || "",
  phone: props.formData.phone || "",
  message: props.formData.message || "",
  preference: props.formData.preference || "",
});

function updateField(field, value) {
  emit("update-data", "info", {
    ...formDataLocal,
    [field]: value,
  });
}
</script>
