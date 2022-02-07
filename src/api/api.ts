import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '61ac4a57-11aa-4c80-a12b-d117d48a000f',
  },
})

export const usersApi = {
  getUsers(currentPage = 1, pageItemsCount = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageItemsCount}`)
      .then((response) => response.data)
  },

  followUser(id: number) {
    return instance.post(`follow/${id}`).then((response) => response.data)
  },

  unFollowUser(id: number) {
    return instance.delete(`follow/${id}`).then((response) => response.data)
  },
}
