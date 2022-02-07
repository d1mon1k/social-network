import { ProfileAction, ProfileActionTypes, IProfile } from './../types/profile-types'

export const setPosts = (): ProfileAction => {
  return { type: ProfileActionTypes.SET_POSTS }
}

export const setNewPost = (message: string): ProfileAction => {
  return { type: ProfileActionTypes.SET_NEW_POST, payload: message }
}

export const fetchProfile = (): ProfileAction => {
  return { type: ProfileActionTypes.FETCH_PROFILE }
}

export const fetchProfileSuccess = (profile: IProfile): ProfileAction => {
  return { type: ProfileActionTypes.FETCH_PROFILE_SUCCESS, payload: profile}
}

export const fetchProfileError = (error: string): ProfileAction => {
  return { type: ProfileActionTypes.FETCH_PROFILE_ERROR, payload: error}
}