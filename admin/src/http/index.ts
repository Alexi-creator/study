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

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.accessToken)

        return $api.request(originalRequest)
      } catch (error) {
        console.log('no authorized!')
      }
    }

    throw error
  }
)

export default $api
