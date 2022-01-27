export interface ProfileState {
  posts: { id: number; message: string }[]
  newPost: string
  profile: IProfile | null
  isFetching: boolean
  error: string | null
}

export interface IProfile {
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
  SET_POSTS = 'SET_POSTS',
  SET_NEW_POST = 'SET_NEW_POST',
  FETCH_PROFILE = 'FETCH_PROFILE',
  FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR'
}

interface SetNewPost {
  type: ProfileActionTypes.SET_NEW_POST
  payload: string
}

interface SetPosts {
  type: ProfileActionTypes.SET_POSTS,
}

interface FetchProfile {
  type: ProfileActionTypes.FETCH_PROFILE
}

interface FetchProfileSuccess {
  type: ProfileActionTypes.FETCH_PROFILE_SUCCESS
  payload: IProfile
}

interface fetchProfileError {
  type: ProfileActionTypes.FETCH_PROFILE_ERROR
  payload: string
}

export type ProfileAction = 
  SetNewPost
  | SetPosts
  | FetchProfile
  | FetchProfileSuccess
  | fetchProfileError
