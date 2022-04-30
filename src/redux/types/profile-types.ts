export type ProfileState = {
  posts: { id: number; message: string }[]
  newPost: string
  profile: ProfileType | null
  isFetching: boolean
  error: string | null
  status: string | null
}

export type ProfileType = {
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

export enum ProfileActionTypes {
  SET_PROFILE_POSTS = 'd/SET_PROFILE_POSTS',
  SET_PROFILE_NEW_POST = 'd/SET_PROFILE_NEW_POST',
  SET_PROFILE_STATUS = 'd/SET_PROFILE_STATUS',
  FETCH_PROFILE = 'd/FETCH_PROFILE',
  FETCH_PROFILE_SUCCESS = 'd/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_ERROR = 'd/FETCH_PROFILE_ERROR'
}

interface SetNewPost {
  type: ProfileActionTypes.SET_PROFILE_NEW_POST
  payload: string
}

interface SetPosts {
  type: ProfileActionTypes.SET_PROFILE_POSTS,
}

interface SetStatus {
  type: ProfileActionTypes.SET_PROFILE_STATUS
  payload: string
}

interface FetchProfile {
  type: ProfileActionTypes.FETCH_PROFILE
}

interface FetchProfileSuccess {
  type: ProfileActionTypes.FETCH_PROFILE_SUCCESS
  payload: ProfileType
}

interface FetchProfileError {
  type: ProfileActionTypes.FETCH_PROFILE_ERROR
  payload: string
}

export type ProfileAction = 
  SetNewPost
  | SetPosts
  | FetchProfile
  | FetchProfileSuccess
  | FetchProfileError
  | SetStatus
