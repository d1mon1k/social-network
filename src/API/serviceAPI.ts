import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '61ac4a57-11aa-4c80-a12b-d117d48a000f',
  },
})

//============================== USERS ==============================
export class UsersAPI {
  static getUsers(currentPage = 1, pageItemsCount = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageItemsCount}`)
      .then((response) => response.data)
  }

  static followUser(id: number) {
    return instance.post(`follow/${id}`).then((response) => response.data)
  }

  static unFollowUser(id: number) {
    return instance.delete(`follow/${id}`).then((response) => response.data)
  }

  static getUserProfile(userId: string) {
    console.warn('Obsolete method. Please use ProfileAPI class')
    return ProfileAPI.getUserProfile(userId)
  }
}

export class ProfileAPI {
  static getStatus(userId: string) {
    return instance.get(`profile/status/${userId}`)
    .then((res) => res.data)
  }

  static setStatus(status: string) {
    return instance.put('profile/status', { status })
    .then((res => res.data))
  }

  static getUserProfile(userId: string) {
    return instance.get(`profile/${userId}`)
    .then((response) => response.data)
  }
}

//============================== AUTH ==============================
export class AuthAPI {
  static authUser() {
    return instance.get('auth/me').then((response) => response.data)
  }

  static authLogin(authData: {email: string, password: string}) {
    return instance.post('auth/login', authData).then(res => res.data)
  }
}
