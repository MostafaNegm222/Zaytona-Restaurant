export const useApi = (request, method, payload, moreHeaders) => {
  const token = useCookie("token" , {
    maxAge: 60 * 60
  });
  const RefreshToken = useCookie("RefreshToken" , {
    maxAge: 60 * 60
  });
  const user = useCookie("userData" ,{
    maxAge: 60 * 60
  })
  const config = useRuntimeConfig();
  const headers = {
    ...moreHeaders,
  };

  if (token.value && user.value.role == 'User') {
    headers["authorization"] = `User ${token.value}`;
    console.log("User")
    
  }
  if (token.value && user.value.role == 'Admin') {
    headers["authorization"] = `Admin ${token.value}`;
    console.log("Admin")
  }


  const body = payload instanceof FormData ? payload : JSON.stringify(payload);


  return $fetch(request, {
    method: method,
    headers: headers,
    body: body,
    baseURL: config.public.baseUrl,
  });
};
