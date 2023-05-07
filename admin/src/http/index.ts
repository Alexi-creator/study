import axios from 'axios'

// TODO change AUTH_URL and AUTH_URL_DEV on main API service (not service auth)
export const API_URL =
  process.env.NODE_ENV === 'development'
    ? process.env.AUTH_URL_DEV
    : process.env.AUTH_URL

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`

  return config
})

export default $api
