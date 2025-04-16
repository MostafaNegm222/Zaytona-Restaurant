export const useAsyncApi = (request, method = "get", payload, moreHeaders) => {
  const token = useCookie("token");
  const config = useRuntimeConfig();
  const headers = {
    ...moreHeaders,
  };

  if (token.value) {
    headers["authorization"] = `User ${token.value}`;
  }

  console.log(`API Request: ${method} ${request}`); // Debug log
  
  return useFetch(request, {
    lazy: false,
    method: method,
    headers: headers,
    body: payload,
    baseURL: config.public.baseUrl,
    onRequestError({ error }) {
      console.error('Request error:', error);
    },
    onResponseError({ response }) {
      console.error('Response error:', response.status, response._data);
    }
  });
};