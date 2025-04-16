export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie("token");
  const user = useCookie("userData");

  const authPages = [
    'auth/Login',
    'auth/SignUp',
    'auth/ForgetPassword',
    'auth/OTP',
    'auth/ResetPassword',
  ];

  const userProtectedRoutes = ["/user/Tables" , 'user/profile','user/profile/Edit','user/profile/Reservations'];
  const adminOnlyRoutes = ["/admin" , "/admin/Tables","/admin/Users"];

  // Redirect unauthenticated users trying to access protected pages
  if (!token.value && [...userProtectedRoutes, ...adminOnlyRoutes].includes(to.path)) {
    return navigateTo("/auth/login");
  }

  // Prevent logged-in users from accessing auth pages
  if (token.value && authPages.includes(to.path)) {
    return navigateTo("/");
  }

  // Prevent normal users from accessing admin routes
  if (token.value && user.value?.role === "User" && adminOnlyRoutes.includes(to.path)) {
    return navigateTo("/");
  }
});

