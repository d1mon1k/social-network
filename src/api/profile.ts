import api from './api'

/* ------------- Types ------------- */
export interface SetStatusApiResponse {
  resultCode: 0 | 1,
  messages: string[]
  data: {}
}

export interface GetUserProfileApiResponse {
  userId: number
  aboutMe: string
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
    small: string
    large: string
  }
}

interface SetProfilePhotoApiResponse {
  data: {
    photos?: {
      large: string
      small: string
    }
  }
  fieldsError: []
  messages: string[]
  resultCode: 0 | 1
}

/* ------------- Api ------------- */
export const getStatusApi = (userId: number) =>
  api.get<string>(`profile/status/${userId}`)

export const setStatusApi = (status: string) =>
  api.put<SetStatusApiResponse>('profile/status', { status })

export const getUserProfileApi = (userId: number) =>
  api.get<GetUserProfileApiResponse>(`profile/${userId}`)

export const setProfilePhotoApi = (file: File) => {
  const formData = new FormData()
  formData.append('image', file)
  console.log(formData.get('image'))
  api.put<SetProfilePhotoApiResponse>('profile/photo', formData, {
    headers: {
      'Contend-Type': 'multipart/form-data',
    },
  })
}

