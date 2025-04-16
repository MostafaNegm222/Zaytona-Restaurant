import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userEmail = ref("")
  const userObj = ref(null)
  
  function setEmail(email) {
    console.log("Setting email in store:", email)
    userEmail.value = email
    console.log("Email after setting:", userEmail.value)
  }
  
  function setUserData(obj) {
    console.log("Setting user in store:", obj)
    userObj.value = obj
    console.log("obj after setting:", userObj.value)
  }

  return { userEmail, userObj, setEmail, setUserData }
}, 
{
  persist: {
    enabled: true,
  }
})