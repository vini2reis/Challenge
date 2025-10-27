import axios from 'axios'

const BACKEND_ENDPOINT = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: BACKEND_ENDPOINT + '/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      const url = err.config?.url || ''
      
      const isLoginRequest = url.includes('/auth/login')
      const isSharedList = url.includes('/shared/')

      if (!isLoginRequest && !isSharedList) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)