import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
})

// Indicar a mi FE, que en todas las llamas al backend, deben buscar un token y pasarlo
service.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken")
  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`
  }
  return config
})


export default service