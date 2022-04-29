import api from './api'

/* ------------- Types ------------- */
export interface SetStatusApiResponse {}

export interface GetUserProfileApiResponse {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
  photos: {
    small: string | null
    large: string | null
  }
}

/* ------------- Api ------------- */
export const getStatusApi = (userId: number) =>
  api.get<string>(`profile/status/${userId}`)

export const setStatusApi = (status: string) =>
  api.put('profile/status', { status })

export const getUserProfileApi = (userId: number) =>
  api.get<GetUserProfileApiResponse>(`profile/${userId}`)
