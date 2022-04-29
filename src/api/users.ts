import api from './api'

/* ------------- Types ------------- */
export interface GetUsersListApiResponse {
  items: {
    name: string,
    id: number,
    photos: {
      small: string | null,
      large: string | null
    },
    status: string | null,
    followed: boolean
  }[],
  totalCount: number,
  error: string | null
}

export interface FollowUserApiResponse {
  resultCode: 0 | 1,
  messages: (string | void)[]
  data: {}
}

export interface UnFollowUserApiResponse {
  resultCode: 0 | 1,
  messages: (string | void)[]
  data: {}
}

/* ------------- Api ------------- */
export const getUsersApi = (currentPage = 1, pageItemsCount = 10) =>
  api.get<GetUsersListApiResponse>(`users?page=${currentPage}&count=${pageItemsCount}`)

export const followUserApi = (id: number) => api.post<FollowUserApiResponse>(`follow/${id}`)

export const unfollowUserApi = (id: number) => api.delete<UnFollowUserApiResponse>(`follow/${id}`)
