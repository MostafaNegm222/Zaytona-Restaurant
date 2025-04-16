<template>
      <div id="google-login"/>
</template>

<script setup>
const config = useRuntimeConfig();
const auth = useAuth()
const user = useUserStore();

const signupWithGoogle = async (response) => {
  const idToken = response.credential;
  const headers = { "Content-Type": "application/json" };
  const res = await auth.loginWithGoogle({idToken} , headers)
  user.setUserData(res)
  console.log(res);
};

onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: config.public.clientId,
    callback: signupWithGoogle,
  });
  

  window.google.accounts.id.renderButton(
    document.getElementById("google-login"),
    { theme: "outline", size: "large",text: "continue_with", }
  );
});
</script>