import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '61ac4a57-11aa-4c80-a12b-d117d48a000f',
  },
})

export default api