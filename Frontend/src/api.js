import axios from 'axios'

const BACKEND_ENDPOINT = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: BACKEND_ENDPOINT + '/api'
})
