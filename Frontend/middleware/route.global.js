export default defineNuxtRouteMiddleware((to) => {
  useHead({
    title: `${to.meta.name} - Zaytona`,
  });

  const route = useRoute();
  watch(() => route.fullPath, () => {
    useHead({
      title: `${route.meta.name} - Zaytona`,
    });
  }, { immediate: true });
});