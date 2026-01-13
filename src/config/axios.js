import axios from "axios"
import { ENV } from "./env"
import { getAuthToken } from "../utils/auth"

const axiosInstance = axios.create({
  baseURL: ENV.REGISTRATION_MS,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  }
})

axiosInstance.interceptors.request.use(
  config => {
    const token = getAuthToken()
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => response.data,
  error => {
    console.error("API Error:", error)
    return Promise.reject(error)
  }
)

export default axiosInstance
