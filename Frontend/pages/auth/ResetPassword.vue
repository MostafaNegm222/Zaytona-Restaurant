<script setup>
import { z } from "zod";
definePageMeta({
  layout: "auth",
  name: "Reset Password"
});

const open = ref(false);
const router = useRouter();

const formState = reactive({
  otp: Array(6).fill(""),
  password: "",
  confirmPassword: "",
});

const isLoading = ref(false);
const errorMsg = ref(null);
const successMsg = ref(null);
const validationErrors = ref({});

// Enhanced Schema Validation with better error messages
const schema = z
  .object({
    otp: z
      .array(z.string().min(1, "OTP digit required").regex(/^\d$/, "Must be a digit"))
      .length(6, "OTP must be 6 digits")
      .refine((val) => !val.includes(""), {
        message: "All OTP digits are required",
      }),
    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z
      .string()
      .trim()
      .min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const auth = useAuth();
const user = useUserStore();
const { userEmail } = storeToRefs(user);

if (!userEmail.value) {
  errorMsg.value = "Email is missing. Please go back to the previous step.";
}

// Password strength indicator
const passwordStrength = computed(() => {
  if (!formState.password) return 0;
  
  let score = 0;
  if (formState.password.length >= 6) score += 1;
  if (formState.password.length >= 10) score += 1;
  if (/[A-Z]/.test(formState.password)) score += 1;
  if (/[a-z]/.test(formState.password)) score += 1;
  if (/[0-9]/.test(formState.password)) score += 1;
  if (/[^A-Za-z0-9]/.test(formState.password)) score += 1;
  
  return Math.min(5, score);
});

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value;
  let value
  if (strength === 0) value = "Very Weak";
  if (strength === 1) value = "Weak";
  if (strength === 2) value = "Fair";
  if (strength === 3) value = "Good";
  if (strength >= 4) value = "Strong";
  return value
});

const passwordStrengthColor = computed(() => {
  const strength = passwordStrength.value;
  let value
  if (strength <= 1) value = "bg-red-500";
  if (strength === 2) value = "bg-orange-500";
  if (strength === 3) value = "bg-yellow-500";
  if (strength >= 4) value = "bg-green-500";
  return value
});

// Passwords match computed property
const passwordsMatch = computed(() => {
  return formState.password === formState.confirmPassword && formState.confirmPassword !== "";
});

// Field validation
function validateField(field) {
  try {
    // Create a partial schema for just this field
    const fieldSchema = schema.pick({ [field]: true });
    fieldSchema.parse({ [field]: formState[field] });
    // Clear error if validation passes
    if (validationErrors.value[field]) {
      delete validationErrors.value[field];
    }
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      validationErrors.value = {
        ...validationErrors.value,
        [field]: error.errors[0].message
      };
    }
    return false;
  }
}

// OTP validation
function validateOtp() {
  try {
    const otpSchema = schema.pick({ otp: true });
    otpSchema.parse({ otp: formState.otp });
    if (validationErrors.value.otp) {
      delete validationErrors.value.otp;
    }
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      validationErrors.value = {
        ...validationErrors.value,
        otp: error.errors[0].message
      };
    }
    return false;
  }
}

// Validate passwords match - Fixed version
function validatePasswordsMatch() {
  if (formState.confirmPassword && formState.password !== formState.confirmPassword) {
    validationErrors.value.confirmPassword = "Passwords must match";
    return false;
  } else {
    // Always clear the error if passwords match or confirmPassword is empty
    if (validationErrors.value.confirmPassword === "Passwords must match") {
      delete validationErrors.value.confirmPassword;
    }
    return true;
  }
}

// Handle OTP input change
function handleOtpChange() {
  validateOtp();
}

// Handle password input change
function handlePasswordChange() {
  validateField('password');
  // Check passwords match whenever password changes too
  validatePasswordsMatch();
}

// Handle confirm password input change
function handleConfirmPasswordChange() {
  validateField('confirmPassword');
  validatePasswordsMatch();
}

// Reset Password submission handler
async function resetPassword() {
  try {
    errorMsg.value = null;
    // If validation passes, proceed with password reset
    isLoading.value = true;
    
    await auth.resetPassword(
      userEmail.value,
      formState.otp.join(""),
      formState.password,
      formState.confirmPassword
    );
    
    successMsg.value = "Password has been successfully reset!";
    open.value = true;
    
    setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Map all validation errors
      error.errors.forEach(err => {
        const field = err.path[0];
        validationErrors.value[field] = err.message;
      });
      
      errorMsg.value = "Please correct the errors in the form";
    } else {
      errorMsg.value = error.message || "Failed to reset password";
    }
    successMsg.value = null;
  } finally {
    isLoading.value = false;
  }
}

// Watch for password and confirmPassword changes to validate matching
watch([() => formState.password, () => formState.confirmPassword], () => {
  validatePasswordsMatch();
}, { immediate: true });

const isNewPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
</script>

<template>
  <div>
    <h1 class="text-xl md:text-3xl mb-6 text-center font-bold text-dark-blue">
      RESET PASSWORD
    </h1>
    <p class="text-lg md:text-xl text-light-dark-blue text-center">
      Enter the OTP sent to your email and set your new password.
    </p>

    <div class="h-auto min-h-[30px] mb-4">
      <p v-if="errorMsg" class="text-center p-2 text-sm bg-red-50 text-red-600 rounded">
        {{ errorMsg }}
      </p>
      <p v-if="successMsg" class="text-center p-2 text-sm bg-green-50 text-green-600 rounded">
        {{ successMsg }}
      </p>
    </div>

    <UForm :state="formState" :schema="schema" @submit="resetPassword">
      <div class="my-4 flex flex-col items-center">
        <label class="mb-2 text-dark-blue font-medium">One-Time Password (OTP)</label>
        <UPinInput 
          v-model="formState.otp" 
          :length="6"
          type="number"
          class="gap-4 bg-transparent"
          variant="outline"
          size="xl"
          :disabled="!userEmail"
          @change="handleOtpChange"
        />
        <div v-if="validationErrors.otp" class="text-sm text-red-600 mt-1 self-start">
          {{ validationErrors.otp }}
        </div>
      </div>

      <div class="mb-4">
        <UFormGroup label="New Password" name="password">
          <UInput
            v-model="formState.password"
            :type="isNewPasswordVisible ? 'text' : 'password'"
            placeholder="New Password"
            class="w-full text-primary border-primary rounded-lg"
            :disabled="!userEmail"
            @input="handlePasswordChange"
            @blur="validateField('password')"
          >
            <template #leading>
              <UIcon name="i-heroicons-lock-closed" class="w-5 h-5 text-primary" />
            </template>
            <template #trailing>
              <UIcon
                :name="isNewPasswordVisible ? 'i-heroicons-eye-off' : 'i-heroicons-eye'"
                class="w-5 h-5 text-primary cursor-pointer"
                @click="isNewPasswordVisible = !isNewPasswordVisible"
              />
            </template>
          </UInput>
          
          <div v-if="validationErrors.password" class="text-sm text-red-600 mt-1">
            {{ validationErrors.password }}
          </div>
          
          <!-- Password requirements list -->
          <div class="mt-2 text-sm text-gray-600">
            <p class="font-medium mb-1">Password must contain:</p>
            <ul class="list-disc pl-5 space-y-1">
              <li :class="{ 'text-green-600': formState.password && formState.password.length >= 6 }">
                At least 6 characters
              </li>
              <li :class="{ 'text-green-600': formState.password && /[A-Z]/.test(formState.password) }">
                One uppercase letter
              </li>
              <li :class="{ 'text-green-600': formState.password && /[a-z]/.test(formState.password) }">
                One lowercase letter
              </li>
              <li :class="{ 'text-green-600': formState.password && /[0-9]/.test(formState.password) }">
                One number
              </li>
              <li :class="{ 'text-green-600': formState.password && /[^A-Za-z0-9]/.test(formState.password) }">
                One special character
              </li>
            </ul>
          </div>
          
          <!-- Password strength indicator -->
          <div v-if="formState.password" class="mt-3">
            <div class="flex items-center mb-1">
              <div class="text-sm mr-2">Password Strength:</div>
              <div
                class="text-sm font-medium" 
                :class="{
                'text-red-600': passwordStrength <= 1,
                'text-orange-600': passwordStrength === 2,
                'text-yellow-600': passwordStrength === 3,
                'text-green-600': passwordStrength >= 4
              }">{{ passwordStrengthText }}</div>
            </div>
            <div class="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full rounded-full transition-all duration-300"
                :class="passwordStrengthColor"
                :style="{ width: `${(passwordStrength / 5) * 100}%` }"/>
            </div>
          </div>
        </UFormGroup>
      </div>

      <div class="mb-6">
        <UFormGroup label="Confirm New Password" name="confirmPassword">
          <UInput
            v-model="formState.confirmPassword"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            placeholder="Confirm New Password"
            class="w-full text-primary border-primary rounded-lg"
            :disabled="!userEmail"
            @input="handleConfirmPasswordChange"
            @blur="validateField('confirmPassword')"
          >
            <template #leading>
              <UIcon name="i-heroicons-lock-closed" class="w-5 h-5 text-primary" />
            </template>
            <template #trailing>
              <UIcon
                :name="isConfirmPasswordVisible ? 'i-heroicons-eye-off' : 'i-heroicons-eye'"
                class="w-5 h-5 text-primary cursor-pointer"
                @click="isConfirmPasswordVisible = !isConfirmPasswordVisible"
              />
            </template>
          </UInput>
          <div v-if="validationErrors.confirmPassword" class="text-sm text-red-600 mt-1">
            {{ validationErrors.confirmPassword }}
          </div>
          <!-- Password match indicator -->
          <div v-if="formState.confirmPassword && passwordsMatch" class="text-sm text-green-600 mt-1">
            Passwords match
          </div>
        </UFormGroup>
      </div>

      <UButton
        :loading="isLoading"
        type="submit"
        color="white"
        class="duration-300 bg-primary text-white text-lg hover:bg-primary-dark"
        block
        :disabled="!userEmail || Object.keys(validationErrors).length > 0"
      >
        {{ isLoading ? 'Processing...' : 'Reset Password' }}
      </UButton>

      <UModal v-model:open="open">
        <template #content>
          <div class="p-6 text-center">
            <UIcon name="i-heroicons-check-circle" class="h-16 w-16 text-green-500 mx-auto mb-4" />
            <p class="text-xl text-green-900">The password is reset successfully!</p>
            <p class="mt-2 text-gray-600">You will be redirected to the login page shortly.</p>
          </div>
        </template>
      </UModal>
    </UForm>

    <p class="mt-4 text-center text-sm text-dark-blue">
      Go back to
      <nuxt-link
        to="/auth/login"
        class="underline underline-offset-4 pl-1 font-semibold text-primary hover:text-primary-dark"
      >
        Log in
      </nuxt-link>
    </p>
  </div>
</template>