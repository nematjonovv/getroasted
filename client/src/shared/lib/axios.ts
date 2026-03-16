import axios from "axios";

const apiReq = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

apiReq.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiReq.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default apiReq