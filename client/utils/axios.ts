import axios from 'axios'

export const backend = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})
