import { backend } from './axios/backend'

export async function fetchUserData(token: string, refreshToken: string) {
  const response = await backend.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
