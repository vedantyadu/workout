import axios, { HttpStatusCode } from 'axios'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../auth'

export const baseBackendURL = 'http://192.168.1.5:8080'

export const backend = axios.create({
  baseURL: baseBackendURL,
})

backend.interceptors.request.use(async (config) => {
  const token = await getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

backend.interceptors.response.use(
  async (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === HttpStatusCode.Unauthorized &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      const newTokens = await refreshTokens()

      originalRequest.headers['Authorization'] =
        `Bearer ${newTokens.accessToken}`

      return backend(originalRequest)
    }

    throw error
  }
)

async function refreshTokens() {
  const refreshToken = await getRefreshToken()

  if (!refreshToken) {
    throw new Error('No refresh token')
  }

  const response = await axios.post(`${baseBackendURL}/auth/refresh`, {
    refreshToken: refreshToken,
  })

  await setAccessToken(response.data.accessToken)
  await setRefreshToken(response.data.refreshToken)

  return response.data
}
