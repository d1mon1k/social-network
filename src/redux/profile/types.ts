import { GetUserProfileApiResponse } from "../../api/profile";

export enum ProfileConstants {
  FETCH_PROFILE_POSTS_REQUEST = 'profile/FETCH_PROFILE_POSTS_REQUEST',
  FETCH_PROFILE_POSTS_SUCCESS = 'profile/FETCH_PROFILE_POSTS_SUCCESS',
  FETCH_PROFILE_POSTS_FAILURE = 'profile/FETCH_PROFILE_POSTS_FAILURE',

  SET_PROFILE_STATUS_REQUEST = 'profile/SET_PROFILE_STATUS_REQUEST',
  SET_PROFILE_STATUS_SUCCESS = 'profile/SET_PROFILE_STATUS_SUCCESS',
  SET_PROFILE_STATUS_FAILURE = 'profile/SET_PROFILE_STATUS_FAILURE',

  FETCH_PROFILE_REQUEST = 'profile/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS = 'profile/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE = 'profile/FETCH_PROFILE_FAILURE'
}

export interface ProfilePost {
  id: number,
  title: string,
  body: string
}

export interface UserProfile extends GetUserProfileApiResponse {}


// export type ProfileState = {
//   posts: { id: number; message: string }[]
//   newPost: string
//   profile: ProfileType | null
//   isFetching: boolean
//   error: string | null
//   status: string | null
// }

// export type ProfileType = {
//   userId: number
//   aboutMe: string
//   lookingForAJob: boolean
//   lookingForAJobDescription: string
//   fullName: string
//   contacts: {
//     github: string
//     vk: string
//     facebook: string
//     instagram: string
//     twitter: string
//     website: string
//     youtube: string
//     mainLink: string
//   }
//   photos: {
//     small: string
//     large: string
//   }
// }


// interface SetNewPost {
//   type: ProfileActionTypes.SET_PROFILE_NEW_POST
//   payload: string
// }

// interface SetPosts {
//   type: ProfileActionTypes.SET_PROFILE_POSTS,
// }

// interface SetStatus {
//   type: ProfileActionTypes.SET_PROFILE_STATUS
//   payload: string
// }

// interface FetchProfile {
//   type: ProfileActionTypes.FETCH_PROFILE
// }

// interface FetchProfileSuccess {
//   type: ProfileActionTypes.FETCH_PROFILE_SUCCESS
//   payload: ProfileType
// }

// interface FetchProfileError {
//   type: ProfileActionTypes.FETCH_PROFILE_ERROR
//   payload: string
// }

// export type ProfileAction = 
//   SetNewPost
//   | SetPosts
//   | FetchProfile
//   | FetchProfileSuccess
//   | FetchProfileError
//   | SetStatus
