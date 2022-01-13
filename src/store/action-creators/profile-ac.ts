import { ProfileAction, ProfileActionTypes } from './../types/profile-types'

export const setPostsActionCreator = (): ProfileAction => {
  return { type: ProfileActionTypes.SET_POSTS }
}

export const setNewPostActionCreator = (message: string): ProfileAction => {
  return { type: ProfileActionTypes.SET_NEW_POST, payload: message }
}
