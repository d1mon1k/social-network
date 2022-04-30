import { ProfileConstants, ProfilePost, UserProfile } from "./types"

/* ------------- Types ------------- */
export interface FetchProfilePostsRequest extends ReturnType<typeof fetchProfilePostsRequest> {}
export interface FetchProfilePostsSuccess extends ReturnType<typeof fetchProfilePostsSuccess> {}
export interface FetchProfilePostsFailure extends ReturnType<typeof fetchProfilePostsFailure> {}
export interface FetchProfileRequest extends ReturnType<typeof fetchProfileRequest> {}
export interface FetchProfileSuccess extends ReturnType<typeof fetchProfileSuccess> {}
export interface FetchProfileFailure extends ReturnType<typeof fetchProfileFailure> {}
export interface SetProfileStatusRequest extends ReturnType<typeof setProfileStatusRequest> {}
export interface SetProfileStatusSuccess extends ReturnType<typeof setProfileStatusSuccess> {}
export interface SetProfileStatusFailure extends ReturnType<typeof setProfileStatusFailure> {}

export type ProfileAction =
  | FetchProfilePostsRequest
  | FetchProfilePostsSuccess
  | FetchProfilePostsFailure
  | FetchProfileRequest
  | FetchProfileSuccess
  | FetchProfileFailure
  | SetProfileStatusRequest
  | SetProfileStatusSuccess
  | SetProfileStatusFailure

/* ------------- Actions ------------- */
export const fetchProfilePostsRequest = () => {
  return <const>{ type: ProfileConstants.FETCH_PROFILE_POSTS_REQUEST }
}

export const fetchProfilePostsSuccess = (posts: ProfilePost[]) => {
  return <const>{ type: ProfileConstants.FETCH_PROFILE_POSTS_SUCCESS, payload: posts }
}

export const fetchProfilePostsFailure = (error: string) => {
  return <const>{ type: ProfileConstants.FETCH_PROFILE_POSTS_FAILURE, payload: error }
}

export const fetchProfileRequest = () => {
  return <const>{type: ProfileConstants.FETCH_PROFILE_REQUEST}
}

export const fetchProfileSuccess = (profile: UserProfile) => {
  return <const>{type: ProfileConstants.FETCH_PROFILE_SUCCESS, payload: profile}
}

export const fetchProfileFailure = (error: string) => {
  return <const>{type: ProfileConstants.FETCH_PROFILE_FAILURE, payload: error}
}

export const setProfileStatusRequest = () => {
  return <const>{type: ProfileConstants.SET_PROFILE_STATUS_REQUEST}
}

export const setProfileStatusSuccess = (status: string) => {
  return <const>{type: ProfileConstants.SET_PROFILE_STATUS_SUCCESS, payload: status}
}

export const setProfileStatusFailure = (error: string) => {
  return <const>{type: ProfileConstants.SET_PROFILE_STATUS_FAILURE, payload: error}
}








// export const setStatus = (status: string) => {
//   return { type: ProfileConstants.SET_PROFILE_STATUS, payload: status }
// }

// export const fetchProfile = () => {
//   return { type: ProfileConstants.FETCH_PROFILE }
// }

// export const fetchProfileSuccess = (profile: ProfileType) => {
//   return { type: ProfileConstants.FETCH_PROFILE_SUCCESS, payload: profile }
// }

// export const fetchProfileError = (error: string) => {
//   return { type: ProfileConstants.FETCH_PROFILE_ERROR, payload: error }
// }


