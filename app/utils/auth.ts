import * as SecureStore from 'expo-secure-store'

export async function getAccessToken() {
  return await SecureStore.getItemAsync('accessToken')
}

export async function setAccessToken(token: string) {
  return await SecureStore.setItemAsync('accessToken', token)
}

export async function removeAccessToken() {
  return await SecureStore.deleteItemAsync('accessToken')
}

export async function getRefreshToken() {
  return await SecureStore.getItemAsync('refreshToken')
}

export async function setRefreshToken(token: string) {
  return await SecureStore.setItemAsync('refreshToken', token)
}

export async function removeRefreshToken() {
  return await SecureStore.deleteItemAsync('refreshToken')
}
