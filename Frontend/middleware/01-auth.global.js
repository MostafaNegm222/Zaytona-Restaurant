export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie("token");
  const user = useCookie("userData");

  const path = to.path.toLowerCase(); // Normalize to lowercase

  const isAuthPage = path.startsWith("/auth");
  const isProfilePage = path.startsWith("/user/profile");
  const isUserTables = path.startsWith("/user/tables");
  const isUserMenuDetail = path.startsWith("/user/menu/") && path !== "/user/menu";
  const isAdminRoute = path.startsWith("/admin");

  const isUserProtected =
    isUserTables || isProfilePage || isUserMenuDetail;

  // Redirect unauthenticated users
  if (!token.value && (isUserProtected || isAdminRoute)) {
    return navigateTo("/auth/login");
  }

  // Prevent logged-in users from accessing auth pages
  if (token.value && isAuthPage) {
    return navigateTo("/");
  }

  // Prevent normal users from accessing admin routes
  if (token.value && user.value?.role === "User" && isAdminRoute) {
    return navigateTo("/");
  }
});
