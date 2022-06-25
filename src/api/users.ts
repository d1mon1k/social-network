import { IUser } from '../redux/users/types'
import { api } from './api'

/* ------------- Types ------------- */
export interface GetUsersListApiResponse {
  items: IUser[],
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
export const fetchUsersApi = (currentPage = 1, pageItemsCount = 10, term = '', friend: null | boolean = null) => 
  api.get<GetUsersListApiResponse>
  (`users?page=${currentPage}&count=${pageItemsCount}&term=${term}${friend !== null ? `&friend=${friend}` : ''}`)

export const followUserApi = (id: number) => api.post<FollowUserApiResponse>(`follow/${id}`)

export const unfollowUserApi = (id: number) => api.delete<UnFollowUserApiResponse>(`follow/${id}`)

