export const useAuth = () => {
  const router = useRouter();
  const token = useCookie("token");
  const refreshToken = useCookie("refreshToken");
  const userData = useCookie("userData")
  // const user = useUserStore();

  // sign up
  async function signup(data) {
    try {
      const res = await useApi("/auth/signup", "POST", data);
      console.log(res);
      return res;
    } catch (error) {
      console.error("Sign up error:", error);
      throw new Error(error.response?._data?.message || "Sign up failed");
    }
  }
  // login
  async function login(data) {
    try {
      const res = await useApi("/auth/signin", "POST", data);
      token.value = res.tokens.access_token;
      refreshToken.value = res.tokens.refresh_token;
      userData.value = res.user
      console.log(res);
      if (res.user.role == "User") {
        router.push("/");
      } else {
        router.push("/admin")
      }
      return res;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?._data?.message || "Login failed");
    }
  }

  async function loginWithGoogle({ idToken }, headers) {
    try {
      const res = await useApi("/auth/loginWithGmail", "POST", { idToken }, headers);
      token.value = res.tokens.access_token;
      refreshToken.value = res.tokens.refresh_token;
      userData.value = res.user
      if (res.user.role == "User") {
        router.push("/");
      } else {
        router.push("/admin")
      }
      return res;
    } catch (error) {
      console.error("Google login error:", error);
      throw new Error(error.response?._data?.message || "Google login failed");
    }
  }

  async function silentMe() {
    try {
      const res = await useApi("/auth/me", "GET");
      return res;
    } catch (error) {
      console.log(error.response?._data?.message || "Login failed");
      router.push("/login");
    }
  }

  async function silentRefresh() {
    try {
      const res = await useApi("/auth/refresh", "POST", {
        refreshToken: refreshToken.value,
      });
      token.value = res.accessToken;
      return res;
    } catch (error) {
      console.log(error.response?._data?.message || "Login failed");
      router.push("/auth/Login");
    }
  }

  // logout
  function logout() {
    token.value = null;
    refreshToken.value = null;
    userData.value = null;
    // router.push("/auth/login")
    window.location.href = `http://localhost:3000/auth/login`
  }
  
  // forget password
  async function requestPasswordReset(email) {
    try {
      const res = await useApi("/auth/forgetPassword", "PATCH", { email });
      return res;
    } catch (error) {
      console.error("Password reset error:", error);
      throw new Error(
        error.response?._data?.message || "Failed to send reset link"
      );
    }
  }

  // reset password with email, OTP, new password and confirm password
  async function resetPassword(email, code, password, confirmPassword) {
    try {
      const res = await useApi("/auth/resetPassword", "PATCH", { 
        email, 
        code, 
        password,
        confirmPassword 
      });
      return res;
    } catch (error) {
      console.error("Password reset error:", error);
      throw new Error(
        error.response?._data?.message || "Failed to reset password"
      );
    }
  }

  // OTP
  const isAuthenticated = ref(false);

  async function verifyOTP(email, code) {
    try {
      console.log(`Verifying OTP: ${code} for email: ${email}`);
      const res = await useApi("/auth/confirmEmail", "PATCH", { email, code });
      token.value = res.accessToken;
      refreshToken.value = res.refreshToken;
      isAuthenticated.value = true;
      router.push("/auth/Login");
      return res;
    } catch (error) {
      console.error("OTP verification error:", error);
      throw new Error(
        error.response?._data?.message || "OTP verification failed"
      );
    }
  }

  return {
    signup,
    login,
    logout,
    silentMe,
    silentRefresh,
    loginWithGoogle,
    requestPasswordReset,
    resetPassword,
    isAuthenticated,
    verifyOTP,
    token,
  };
};