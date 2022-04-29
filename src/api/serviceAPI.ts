import api from './api'

//============================== USERS ==============================
export class UsersAPI {
  static getUsers(currentPage = 1, pageItemsCount = 10) {
    return api
      .get(`users?page=${currentPage}&count=${pageItemsCount}`)
      .then((response) => response.data)
  }

  static followUser(id: number) {
    return api.post(`follow/${id}`).then((response) => response.data)
  }

  static unFollowUser(id: number) {
    return api.delete(`follow/${id}`).then((response) => response.data)
  }

  static getUserProfile(userId: number) {
    console.warn('Obsolete method. Please use ProfileAPI class')
    return ProfileAPI.getUserProfile(userId)
  }
}

//============================== PROFILE ============================== 
export class ProfileAPI {
  static getStatus(userId: number) {
    return api.get(`profile/status/${userId}`)
    .then((res) => res.data)
  }

  static setStatus(status: string) {
    return api.put('profile/status', { status })
    .then((res => res.data))
  }

  static getUserProfile(userId: number) {
    return api.get(`profile/${userId}`)
    .then((response) => response.data)
  }
}

//============================== AUTH ==============================
export class AuthAPI {
  static authUser() {
    return api.get('auth/me').then((response) => response.data)
  }

  static authLogin(authData: {email: string, password: string}) {
    return api.post('auth/login', authData).then(res => res.data)
  }

  static authLogout() {
    return api.delete('/auth/login').then(res => res.data)
  }
}
